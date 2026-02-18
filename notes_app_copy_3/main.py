#!/usr/bin/env python3
"""Infinite canvas note app with Hebrew support."""

import sys
from PyQt5.QtCore import Qt, QPointF, QEvent
from PyQt5.QtGui import QFont, QColor, QTextCursor, QPainter, QKeySequence
from PyQt5.QtWidgets import (
    QApplication,
    QMainWindow,
    QToolBar,
    QAction,
    QColorDialog,
    QSpinBox,
    QGraphicsView,
    QGraphicsScene,
    QGraphicsTextItem,
    QGraphicsItemGroup,
    QStyle,
    QShortcut,
)


class EditableTextItem(QGraphicsTextItem):
    def keyPressEvent(self, event):
        if event.modifiers() == Qt.ControlModifier:
            if event.key() == Qt.Key_B:
                event.accept()
                self._toggle_bold()
                return
            elif event.key() == Qt.Key_I:
                event.accept()
                self._toggle_italic()
                return
            elif event.key() == Qt.Key_L:
                event.accept()
                self._set_alignment(Qt.AlignLeft)
                return
            elif event.key() == Qt.Key_E:
                event.accept()
                self._set_alignment(Qt.AlignCenter)
                return
            elif event.key() == Qt.Key_R:
                event.accept()
                self._set_alignment(Qt.AlignRight)
                return
        elif event.modifiers() == (Qt.ControlModifier | Qt.ShiftModifier):
            if event.key() == Qt.Key_R:
                event.accept()
                self._toggle_rtl()
                return
        
        if event.key() == Qt.Key_Tab:
            event.accept()
            cursor = self.textCursor()
            cursor.insertText("    ")
            self.setTextCursor(cursor)
            return
        
        if event.key() == Qt.Key_Return:
            cursor = self.textCursor()
            block = cursor.block()
            text = block.text()
            for prefix in ["- ", "+ ", "* ", "1. ", "2. ", "3. "]:
                if text == prefix or text.startswith(prefix):
                    event.accept()
                    cursor.insertText("\n" + prefix)
                    self.setTextCursor(cursor)
                    return
        
        super().keyPressEvent(event)
    
    def _set_alignment(self, align):
        cursor = self.textCursor()
        cursor.select(cursor.BlockUnderCursor)
        fmt = cursor.blockFormat()
        fmt.setAlignment(align)
        cursor.setBlockFormat(fmt)
        self.setTextWidth(self.textWidth())
        self.update()
    
    def _toggle_rtl(self):
        cursor = self.textCursor()
        cursor.select(cursor.BlockUnderCursor)
        fmt = cursor.blockFormat()
        if fmt.layoutDirection() == Qt.RightToLeft:
            fmt.setLayoutDirection(Qt.LeftToRight)
        else:
            fmt.setLayoutDirection(Qt.RightToLeft)
        cursor.setBlockFormat(fmt)
        self.setTextWidth(self.textWidth())
        self.update()
    
    def _toggle_bold(self):
        cursor = self.textCursor()
        if cursor.hasSelection():
            char_fmt = cursor.charFormat()
            font = char_fmt.font()
            font.setBold(not font.bold())
            char_fmt.setFont(font)
            cursor.setCharFormat(char_fmt)
        else:
            font = self.font()
            font.setBold(not font.bold())
            self.setFont(font)
        self.setTextCursor(cursor)
    
    def _toggle_italic(self):
        cursor = self.textCursor()
        if cursor.hasSelection():
            char_fmt = cursor.charFormat()
            font = char_fmt.font()
            font.setItalic(not font.italic())
            char_fmt.setFont(font)
            cursor.setCharFormat(char_fmt)
        else:
            font = self.font()
            font.setItalic(not font.italic())
            self.setFont(font)
        self.setTextCursor(cursor)


class CanvasView(QGraphicsView):
    def __init__(self, scene):
        super().__init__(scene)
        self.setRenderHints(self.renderHints() | QPainter.Antialiasing)
        self.setDragMode(QGraphicsView.RubberBandDrag)
        self.setViewportUpdateMode(QGraphicsView.FullViewportUpdate)
        self.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        self.scene().setSceneRect(-100000, -100000, 200000, 200000)
        self._current_font = QFont("Sans", 12)
        self._current_color = QColor(0, 0, 0)
        self._dark_mode = False
        self._rtl_mode = True
        self._update_colors()

    def set_current_font(self, font):
        self._current_font = font

    def set_current_color(self, color):
        self._current_color = color

    def _update_colors(self):
        if self._dark_mode:
            bg = QColor(30, 30, 30)
            fg = QColor(240, 240, 240)
        else:
            bg = QColor(255, 255, 255)
            fg = QColor(0, 0, 0)
        self.setStyleSheet(f"QGraphicsView {{ background-color: {bg.name()}; }}")
        self.scene().setBackgroundBrush(bg)
        if self._current_color not in [QColor(0, 0, 0), QColor(240, 240, 240)]:
            return
        self._current_color = fg

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            scene_pos = self.mapToScene(event.pos())
            item = self.scene().itemAt(scene_pos, self.transform())
            if item is None or not isinstance(item, QGraphicsTextItem):
                self._create_text_item(scene_pos)
                return
            item.setSelected(True)
            if event.modifiers() & Qt.ControlModifier:
                item.setTextInteractionFlags(Qt.NoTextInteraction)
                item.setFlag(QGraphicsTextItem.ItemIsMovable, True)
            else:
                item.setTextInteractionFlags(Qt.TextEditorInteraction)
                item.setFlag(QGraphicsTextItem.ItemIsMovable, False)
        super().mousePressEvent(event)

    def _create_text_item(self, pos):
        item = EditableTextItem("")
        item.setTextInteractionFlags(Qt.TextEditorInteraction)
        item.setFlag(QGraphicsTextItem.ItemIsMovable, True)
        item.setFlag(QGraphicsTextItem.ItemIsSelectable, True)
        item.setFlag(QGraphicsTextItem.ItemIsFocusable, True)
        item.setTextWidth(200)
        item.setDefaultTextColor(self._current_color)
        item.setFont(self._current_font)
        doc = item.document()
        doc.setDefaultFont(self._current_font)
        
        cursor = item.textCursor()
        block_fmt = cursor.blockFormat()
        if self._rtl_mode:
            block_fmt.setLayoutDirection(Qt.RightToLeft)
            block_fmt.setAlignment(Qt.AlignRight)
        else:
            block_fmt.setLayoutDirection(Qt.LeftToRight)
            block_fmt.setAlignment(Qt.AlignLeft)
        cursor.setBlockFormat(block_fmt)
        
        item.setPos(pos)
        self.scene().addItem(item)
        item.setFocus()
        return item


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Notes Canvas")
        self.resize(1024, 768)

        self.scene = QGraphicsScene()
        self.scene.setBackgroundBrush(QColor(Qt.white))
        self.view = CanvasView(self.scene)
        self.setCentralWidget(self.view)

        self._create_toolbar()
        self._create_shortcuts()

    def _create_shortcuts(self):
        shortcuts = [
            (Qt.CTRL + Qt.Key_B, self._toggle_bold),
            (Qt.CTRL + Qt.Key_I, self._toggle_italic),
            (Qt.CTRL + Qt.Key_L, lambda: self._set_alignment(Qt.AlignLeft)),
            (Qt.CTRL + Qt.Key_E, lambda: self._set_alignment(Qt.AlignCenter)),
            (Qt.CTRL + Qt.Key_R, lambda: self._set_alignment(Qt.AlignRight)),
            (Qt.CTRL + Qt.SHIFT + Qt.Key_R, self._toggle_rtl),
        ]
        for key, handler in shortcuts:
            sc = QShortcut(QKeySequence(key), self)
            sc.activated.connect(handler)

    def _toggle_rtl(self):
        for item in self.scene.items():
            if isinstance(item, EditableTextItem):
                if item.textInteractionFlags() == Qt.TextEditorInteraction:
                    item._toggle_rtl()

    def _set_alignment(self, align):
        for item in self.scene.items():
            if isinstance(item, EditableTextItem):
                if item.textInteractionFlags() == Qt.TextEditorInteraction:
                    item._set_alignment(align)

    def _toggle_bold(self):
        for item in self.scene.items():
            if isinstance(item, EditableTextItem) and item.hasFocus():
                item._toggle_bold()

    def _toggle_italic(self):
        for item in self.scene.items():
            if isinstance(item, EditableTextItem) and item.hasFocus():
                item._toggle_italic()

    def _create_toolbar(self):
        toolbar = QToolBar("Formatting")
        toolbar.setStyleSheet("""
            QToolBar { background: #ddd; border: 1px solid #999; }
            QToolButton, QAction, QSpinBox, QComboBox { color: #000; }
        """)
        self.addToolBar(toolbar)

        self.size_spin = QSpinBox()
        self.size_spin.setRange(6, 72)
        self.size_spin.setValue(12)
        self.size_spin.valueChanged.connect(self._on_size_changed)
        toolbar.addWidget(self.size_spin)

        self.color_btn = QAction(
            self.style().standardIcon(QStyle.SP_DialogYesButton), "Color", self
        )
        self.color_btn.triggered.connect(self._pick_color)
        toolbar.addAction(self.color_btn)

        toolbar.addSeparator()

        group_action = QAction("Group Selected", self)
        group_action.triggered.connect(self._group_selection)
        toolbar.addAction(group_action)

        ungroup_action = QAction("Ungroup", self)
        ungroup_action.triggered.connect(self._ungroup_selection)
        toolbar.addAction(ungroup_action)

        toolbar.addSeparator()

        dark_action = QAction("Toggle Dark Mode", self)
        dark_action.triggered.connect(self._toggle_dark_mode)
        toolbar.addAction(dark_action)

        toolbar.addSeparator()

        rtl_action = QAction("RTL Mode", self)
        rtl_action.triggered.connect(self._toggle_rtl)
        toolbar.addAction(rtl_action)

    def _on_size_changed(self, size):
        font = self.view._current_font
        font.setPointSize(size)
        self.view.set_current_font(font)
        for item in self._selected_text_items():
            f = item.font()
            f.setPointSize(size)
            item.setFont(f)

    def _pick_color(self):
        dialog = QColorDialog(self.view._current_color, self)
        dialog.setStyleSheet("""
            QColorDialog { background: #fff; color: #000; }
            QLabel { color: #000; }
            QPushButton { background: #ddd; color: #000; border: 1px solid #999; }
        """)
        if dialog.exec_() == QColorDialog.Accepted:
            color = dialog.currentColor()
            self.view.set_current_color(color)
            for item in self._selected_text_items():
                item.setDefaultTextColor(color)

    def _selected_text_items(self):
        return [i for i in self.scene.selectedItems() if isinstance(i, QGraphicsTextItem)]

    def _group_selection(self):
        selected = self.scene.selectedItems()
        if len(selected) < 2:
            return
        group = QGraphicsItemGroup()
        self.scene.addItem(group)
        for item in selected:
            group.addToGroup(item)
        group.setFlag(QGraphicsItemGroup.ItemIsMovable, True)
        group.setFlag(QGraphicsItemGroup.ItemIsSelectable, True)
        for item in selected:
            item.setFlag(QGraphicsTextItem.ItemIsMovable, False)
            item.setFlag(QGraphicsTextItem.ItemIsSelectable, False)
        group.setSelected(True)

    def _ungroup_selection(self):
        for item in self.scene.selectedItems():
            if isinstance(item, QGraphicsItemGroup):
                children = item.childItems()
                item.destroyItemGroup(item)
                for child in children:
                    if isinstance(child, QGraphicsTextItem):
                        child.setFlag(QGraphicsTextItem.ItemIsMovable, True)
                        child.setFlag(QGraphicsTextItem.ItemIsSelectable, True)

    def _toggle_dark_mode(self):
        self.view._dark_mode = not self.view._dark_mode
        self.view._update_colors()
        self._update_toolbar_style()

    def _update_toolbar_style(self):
        dark = self.view._dark_mode
        bg = "#444" if dark else "#ddd"
        border = "#666" if dark else "#999"
        text = "#fff" if dark else "#000"
        for tb in self.findChildren(QToolBar):
            tb.setStyleSheet(f"QToolBar {{ background: {bg}; border: 1px solid {border}; }} QToolButton, QAction, QSpinBox, QComboBox {{ color: {text}; }}")

    def eventFilter(self, obj, event):
        if event.type() == QEvent.KeyPress:
            if event.modifiers() == Qt.ControlModifier:
                key = event.key()
                if key == Qt.Key_B:
                    self._toggle_bold()
                    return True
                elif key == Qt.Key_I:
                    self._toggle_italic()
                    return True
                elif key == Qt.Key_L:
                    self._set_alignment(Qt.AlignLeft)
                    return True
                elif key == Qt.Key_E:
                    self._set_alignment(Qt.AlignCenter)
                    return True
                elif key == Qt.Key_R:
                    self._set_alignment(Qt.AlignRight)
                    return True
        return super().eventFilter(obj, event)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWindow()
    app.installEventFilter(win)
    win.show()
    sys.exit(app.exec_())
