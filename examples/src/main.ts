import { Container } from "inversify";
import { TheiaApplication, browserApplicationModule } from "theia/src/application/browser";
import { messagingModule } from "theia/src/messaging/browser";
import { navigatorModule } from "theia/src/navigator/browser";
import { fileSystemClientModule } from "theia/src/filesystem/browser";
import { editorModule } from "theia/src/editor/browser";
import { browserLanguagesModule } from 'theia/src/languages/browser';
import { monacoModule } from 'theia/src/monaco/browser';
import "theia/src/application/browser/style/index.css";
import "theia/src/editor/browser/style/index.css";
import "theia/src/navigator/browser/style/index.css";

export function start(clientContainer?: Container) {

    // Create the common client container.
    const container = new Container();
    container.load(browserApplicationModule);
    container.load(messagingModule);
    container.load(navigatorModule);
    container.load(fileSystemClientModule);
    container.load(editorModule);
    container.load(browserLanguagesModule);
    container.load(monacoModule);

    // Merge the common conatiner with the client specific one. If any.
    const mainContainer = clientContainer ? Container.merge(container, clientContainer) : container;

    // Obtain application and start.
    const application = mainContainer.get(TheiaApplication);
    application.start(mainContainer);
}