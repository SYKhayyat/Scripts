#!/usr/bin/env python3
"""Infinite canvas note app with Hebrew support."""

import sys
from PyQt5.QtCore import Qt, QPointF, QEvent, QRectF
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
    _checkbox_size = 12
    _checkbox_margin = 2

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._group_checked = False
        self.setFlag(QGraphicsTextItem.ItemSendsGeometryChanges, True)

    def is_group_checked(self):
        return self._group_checked

    def set_group_checked(self, checked):
        self._group_checked = checked
        self.update()

    def _is_checkbox_clicked(self, pos):
        rect = self.boundingRect()
        cb_x = rect.width() + self._checkbox_margin
        cb_y = self._checkbox_margin
        cb_rect = QRectF(cb_x, cb_y, self._checkbox_size, self._checkbox_size)
        return cb_rect.contains(pos)

    def paint(self, painter, option, widget):
        super().paint(painter, option, widget)
        rect = self.boundingRect()
        cb_x = rect.width() + self._checkbox_margin
        cb_y = self._checkbox_margin
        cb_rect = QRectF(cb_x, cb_y, self._checkbox_size, self._checkbox_size)
        painter.setPen(QColor(0, 0, 0))
        painter.setBrush(QColor(255, 255, 255))
        painter.drawRect(cb_rect)
        if self._group_checked:
            painter.setBrush(QColor(0, 0, 0))
            inner = cb_rect.adjusted(2, 2, -2, -2)
            painter.drawRect(inner)

    def keyPressEvent(self, event):
        if event.key() in (Qt.Key_Backspace, Qt.Key_Delete):
            cursor = self.textCursor()
            cursor.select(cursor.Document)
            text = cursor.selectedText()
            if len(text) <= 1:
                self._has_language_set = False
        
        char = event.text()
        if char and not self._has_language_set and char.isalpha():
            codepoint = ord(char)
            if 0x0590 <= codepoint <= 0x05FF:
                self._set_rtl()
            elif 'A' <= char.upper() <= 'Z':
                self._set_ltr()
            self._has_language_set = True
        
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
            if event.key() == Qt.Key_D:
                event.accept()
                self.scene().removeItem(self)
                return
            if event.key() == Qt.Key_R:
                event.accept()
                self._set_rtl()
                return
            if event.key() == Qt.Key_L:
                event.accept()
                self._set_ltr()
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
            for prefix in ["- ", "+ ", "* "]:
                if text == prefix or text.startswith(prefix):
                    event.accept()
                    cursor.insertText("\n" + prefix)
                    self.setTextCursor(cursor)
                    return
            import re
            match = re.match(r'^(\d+)\. ', text)
            if match:
                num = int(match.group(1))
                event.accept()
                cursor.insertText("\n" + str(num + 1) + ". ")
                self.setTextCursor(cursor)
                return
        
        super().keyPressEvent(event)
    
    def _set_alignment(self, align):
        cursor = self.textCursor()
        cursor.select(cursor.BlockUnderCursor)
        fmt = cursor.blockFormat()
        
        if fmt.layoutDirection() == Qt.RightToLeft:
            if align == Qt.AlignLeft:
                align = Qt.AlignRight
            elif align == Qt.AlignRight:
                align = Qt.AlignLeft
        
        fmt.setAlignment(align)
        cursor.setBlockFormat(fmt)
        self.setTextWidth(self.textWidth())
        self.update()
    
    def _set_rtl(self):
        cursor = self.textCursor()
        fmt = cursor.blockFormat()
        fmt.setLayoutDirection(Qt.RightToLeft)
        fmt.setAlignment(Qt.AlignRight)
        cursor.setBlockFormat(fmt)
        
        doc = self.document()
        opt = doc.defaultTextOption()
        opt.setTextDirection(Qt.RightToLeft)
        opt.setAlignment(Qt.AlignRight)
        doc.setDefaultTextOption(opt)
        
        self.setTextCursor(cursor)
        self.setTextWidth(self.textWidth())
        self.update()
    
    def _set_ltr(self):
        cursor = self.textCursor()
        fmt = cursor.blockFormat()
        fmt.setLayoutDirection(Qt.LeftToRight)
        fmt.setAlignment(Qt.AlignLeft)
        cursor.setBlockFormat(fmt)
        
        doc = self.document()
        opt = doc.defaultTextOption()
        opt.setTextDirection(Qt.LeftToRight)
        opt.setAlignment(Qt.AlignLeft)
        doc.setDefaultTextOption(opt)
        
        self.setTextCursor(cursor)
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
            
            for item in self.scene().items():
                if isinstance(item, EditableTextItem):
                    pos = item.mapFromScene(scene_pos)
                    if item._is_checkbox_clicked(pos):
                        item._group_checked = not item._group_checked
                        item.update()
                        return
            
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

    def mouseReleaseEvent(self, event):
        super().mouseReleaseEvent(event)

    def _create_text_item(self, pos):
        item = EditableTextItem("")
        item._has_language_set = False
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
        block_fmt.setLayoutDirection(Qt.RightToLeft)
        block_fmt.setAlignment(Qt.AlignRight)
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
            (Qt.CTRL + Qt.Key_L, lambda: self._set_alignment(Qt.AlignLeft, False)),
            (Qt.CTRL + Qt.Key_E, lambda: self._set_alignment(Qt.AlignCenter, False)),
            (Qt.CTRL + Qt.Key_R, lambda: self._set_alignment(Qt.AlignRight, False)),
            (Qt.ALT + Qt.CTRL + Qt.Key_L, lambda: self._set_alignment(Qt.AlignLeft, True)),
            (Qt.ALT + Qt.CTRL + Qt.Key_E, lambda: self._set_alignment(Qt.AlignCenter, True)),
            (Qt.ALT + Qt.CTRL + Qt.Key_R, lambda: self._set_alignment(Qt.AlignRight, True)),
            (Qt.CTRL + Qt.SHIFT + Qt.Key_D, self._delete_selected),
        ]
        for key, handler in shortcuts:
            sc = QShortcut(QKeySequence(key), self)
            sc.activated.connect(handler)

    def _delete_selected(self):
        for item in self.scene.selectedItems():
            self.scene.removeItem(item)

    def _set_alignment(self, align, all_items=False):
        if all_items:
            for item in self.scene.items():
                if isinstance(item, EditableTextItem):
                    if item.textInteractionFlags() == Qt.TextEditorInteraction:
                        item._set_alignment(align)
        else:
            for item in self.scene.items():
                if isinstance(item, EditableTextItem) and item.hasFocus():
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
        items_to_group = []
        for item in self.scene.items():
            if isinstance(item, EditableTextItem) and item.is_group_checked():
                parent = item.parentItem()
                if isinstance(parent, QGraphicsItemGroup):
                    parent.removeFromGroup(item)
                items_to_group.append(item)
        
        if len(items_to_group) < 2:
            for item in items_to_group:
                item.set_group_checked(False)
            return
        
        group = QGraphicsItemGroup()
        self.scene.addItem(group)
        for item in items_to_group:
            group.addToGroup(item)
        group.setFlag(QGraphicsItemGroup.ItemIsMovable, True)
        group.setFlag(QGraphicsItemGroup.ItemIsSelectable, True)
        for item in items_to_group:
            item.setFlag(QGraphicsTextItem.ItemIsMovable, False)
            item.setFlag(QGraphicsTextItem.ItemIsSelectable, False)
            item.set_group_checked(False)
        group.setSelected(True)

    def _ungroup_selection(self):
        items_to_ungroup = []
        
        for item in self.scene.items():
            if isinstance(item, EditableTextItem) and item.is_group_checked():
                parent = item.parentItem()
                if isinstance(parent, QGraphicsItemGroup):
                    items_to_ungroup.append(item)
        
        for item in items_to_ungroup:
            parent = item.parentItem()
            if isinstance(parent, QGraphicsItemGroup):
                parent.removeFromGroup(item)
                item.setFlag(QGraphicsTextItem.ItemIsMovable, True)
                item.setFlag(QGraphicsTextItem.ItemIsSelectable, True)
                item.set_group_checked(False)
        
        all_items = list(self.scene.items())
        for item in all_items:
            if isinstance(item, QGraphicsItemGroup):
                children = item.childItems()
                if len(children) == 0:
                    item.destroyItemGroup(item)

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
            all_items = event.modifiers() == (Qt.ControlModifier | Qt.AltModifier)
            mod = event.modifiers()
            if mod == Qt.ControlModifier or mod == (Qt.ControlModifier | Qt.AltModifier):
                key = event.key()
                if key == Qt.Key_B:
                    self._toggle_bold()
                    return True
                elif key == Qt.Key_I:
                    self._toggle_italic()
                    return True
                elif key == Qt.Key_L:
                    self._set_alignment(Qt.AlignLeft, all_items)
                    return True
                elif key == Qt.Key_E:
                    self._set_alignment(Qt.AlignCenter, all_items)
                    return True
                elif key == Qt.Key_R:
                    self._set_alignment(Qt.AlignRight, all_items)
                    return True
        return super().eventFilter(obj, event)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWindow()
    app.installEventFilter(win)
    win.show()
    sys.exit(app.exec_())
