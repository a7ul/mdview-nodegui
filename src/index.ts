import {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPlainTextEdit
} from "@nodegui/nodegui";
import showdown from "showdown";

const win = new QMainWindow();
win.setWindowTitle("Markdown editor in NodeGui");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const editor = new QPlainTextEdit();
editor.setInlineStyle(`
    border: 1px solid green;
    flex: 1;
    min-width: 200;
`);
const preview = new QLabel();
preview.setInlineStyle(`
    border: 1px solid blue;
    flex: 1;
    min-width: 200;
    qproperty-alignment: 'AlignTop';
`);
editor.addEventListener("textChanged", () => {
  const rawText = editor.toPlainText();
  const converter = new showdown.Converter();
  const html = converter.makeHtml(rawText);
  preview.setText(html);
});

rootLayout.addWidget(editor);
rootLayout.addWidget(preview);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      height: '100%';
      width: '100%';
      flex-direction: 'row';
      justify-content: 'space-between';
    }

  `
);
win.show();

(global as any).win = win;
