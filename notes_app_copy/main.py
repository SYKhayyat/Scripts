#!/usr/bin/env python3
"""Infinite canvas note app with Hebrew support."""

import sys
from PyQt5.QtCore import Qt, QPointF
from PyQt5.QtGui import QFont, QColor, QTextCursor, QTextListFormat, QPainter
from PyQt5.QtWidgets import (
    QApplication,
    QMainWindow,
    QToolBar,
    QAction,
    QColorDialog,
    QSpinBox,
    QComboBox,
    QGraphicsView,
    QGraphicsScene,
    QGraphicsTextItem,
    QGraphicsItemGroup,
    QStyle,
)


class CanvasView(QGraphicsView):
    def __init__(self, scene):
        super().__init__(scene)
        self.setRenderHints(self.renderHints() | QPainter.Antialiasing)
        self.setDragMode(QGraphicsView.RubberBandDrag)
        self.setViewportUpdateMode(QGraphicsView.FullViewportUpdate)
        self.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        self.scene().setSceneRect(-100000, -100000, 200000, 200000)
        self._current_font = QFont("Sans", 12)
        self._current_color = QColor(Qt.black)

    def set_current_font(self, font):
        self._current_font = font

    def set_current_color(self, color):
        self._current_color = color

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            scene_pos = self.mapToScene(event.pos())
            item = self.scene().itemAt(scene_pos, self.transform())
            if item is None or not isinstance(item, QGraphicsTextItem):
                self._create_text_item(scene_pos)
                return
        super().mousePressEvent(event)

    def _create_text_item(self, pos):
        item = QGraphicsTextItem("")
        item.setTextInteractionFlags(Qt.TextEditorInteraction)
        item.setFlag(QGraphicsTextItem.ItemIsMovable, True)
        item.setFlag(QGraphicsTextItem.ItemIsSelectable, True)
        item.setDefaultTextColor(self._current_color)
        item.setFont(self._current_font)
        doc = item.document()
        doc.setDefaultFont(self._current_font)
        opt = doc.defaultTextOption()
        opt.setAlignment(Qt.AlignRight | Qt.AlignTop)
        doc.setDefaultTextOption(opt)
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
        self.view = CanvasView(self.scene)
        self.setCentralWidget(self.view)

        self._create_toolbar()

    def _create_toolbar(self):
        toolbar = QToolBar("Formatting")
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

        unordered_action = QAction("• Unordered", self)
        unordered_action.triggered.connect(lambda: self._apply_list(QTextListFormat.ListDisc, 0))
        toolbar.addAction(unordered_action)

        ordered_action = QAction("1. Ordered", self)
        ordered_action.triggered.connect(lambda: self._apply_list(QTextListFormat.ListDecimal, 0))
        toolbar.addAction(ordered_action)

        self.indent_combo = QComboBox()
        self.indent_combo.addItems(["No indent", "+1 indent", "+2 indent", "+3 indent"])
        self.indent_combo.setCurrentIndex(0)
        toolbar.addWidget(self.indent_combo)

        toolbar.addSeparator()

        group_action = QAction("Group Selected", self)
        group_action.triggered.connect(self._group_selection)
        toolbar.addAction(group_action)

        ungroup_action = QAction("Ungroup", self)
        ungroup_action.triggered.connect(self._ungroup_selection)
        toolbar.addAction(ungroup_action)

    def _on_size_changed(self, size):
        font = self.view._current_font
        font.setPointSize(size)
        self.view.set_current_font(font)
        for item in self._selected_text_items():
            f = item.font()
            f.setPointSize(size)
            item.setFont(f)

    def _pick_color(self):
        color = QColorDialog.getColor()
        if color.isValid():
            self.view.set_current_color(color)
            for item in self._selected_text_items():
                item.setDefaultTextColor(color)

    def _selected_text_items(self):
        return [i for i in self.scene.selectedItems() if isinstance(i, QGraphicsTextItem)]

    def _apply_list(self, style, extra_indent):
        indent_level = self.indent_combo.currentIndex()
        fmt = QTextListFormat()
        fmt.setStyle(style)
        fmt.setIndent(indent_level + 1 + extra_indent)
        
        for item in self._selected_text_items():
            cursor = item.textCursor()
            if not cursor.hasSelection():
                cursor.select(QTextCursor.BlockUnderCursor)
            cursor.createList(fmt)
            item.setTextCursor(cursor)

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


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec_())
