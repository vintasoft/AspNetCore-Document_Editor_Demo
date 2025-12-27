var _documentEditor;

var _localizer;

var _blockUiDialog;

var _isTextEditing = false;


// === Document editor events ===

function __documentEditor_warningOccured(event, eventArgs) {
    // show the error message
    __showErrorMessage(eventArgs.message);
}

function __documentEditor_synchronizationException(event, eventArgs) {
    // show the error message
    __showErrorMessage(eventArgs.message);
}

function __documentEditor_asyncOperationStarted(event, eventArgs) {
    // block UI
    __blockUI(eventArgs.description);
}

function __documentEditor_asyncOperationFinished(event, eventArgs) {
    // unblock UI
    __unblockUI();
}

function __documentEditor_asyncOperationFailed(event, eventArgs) {
    // unblock UI
    __unblockUI();

    // get description of asynchronous operation
    var description = eventArgs.description;
    // get additional information about asynchronous operation
    var additionalInfo = eventArgs.data;
    // if additional information exists
    if (additionalInfo != null)
        // show error message
        __showErrorMessage(additionalInfo);
    // if additional information does NOT exist
    else
        // show error message
        __showErrorMessage(description + ": unknown error.");
}

function __documentEditor_saveChangesRequest(event, eventArgs) {
    if (!confirm("Document is changed and needs to be saved. Do you want to save document?")) {
        eventArgs.cancel = true;
    }
}

function __documentEditor_textEditingStarting(event, eventArgs) {
    if (!__isTouchDevice())
        return;

    _isTextEditing = true;
    __changeDemoHeaderVisibility(true);
}

function __documentEditor_textEditingFinished(event, eventArgs) {
    if (!__isTouchDevice())
        return;

    __changeDemoHeaderVisibility(false);
    _isTextEditing = false;
}



// === Open default document ===

function __openDefaultDocument() {
    var fileId = "DocxTestDocument.docx";
    // copy the file from global folder to the session folder
    Vintasoft.Imaging.VintasoftFileAPI.copyFile("UploadedImageFiles/" + fileId, __onCopyFile_success, __onCopyFile_error);
}

/**
 Request for copying of file is executed successfully.
 @param {object} data Information about copied file.
*/
function __onCopyFile_success(data) {
    // open document in the document editor
    _documentEditor.openDocument(data.fileId);
}

/**
 Request for copying of file is failed.
 @param {object} data Information about error.
*/
function __onCopyFile_error(data) {
    alert(data.errorMessage);
}



// === Utils ===

/**
 Blocks the UI. 
 @param {string} text Message that describes why UI is blocked.
*/
function __blockUI(text) {
    _blockUiDialog = new BlockUiDialogJS(text);
}

/**
 Unblocks the UI.
*/
function __unblockUI() {
    if (_blockUiDialog != null) {
        _blockUiDialog.close();
        _blockUiDialog = null;
    }
}

/**
 Shows an error message.
 @param {object} data Information about error.
*/
function __showErrorMessage(data) {
    __unblockUI();
    new ErrorMessageDialogJS(data);
}

/**
 Returns application URL.
*/
function __getApplicationUrl() {
    var applicationUrl = window.location.toString();
    if (applicationUrl[applicationUrl.length - 1] != '/')
        applicationUrl = applicationUrl + '/';
    return applicationUrl;
}

/**
 Returns a value indicating whether application is executing on mobile device.
*/
function __isMobileDevice() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

/**
 Returns a value indicating whether application is executed on touch device.
*/
function __isTouchDevice() {
    return (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

/**
 Window is resized.
*/
function __window_resize() {
    __changeDemoHeaderVisibility(window.innerHeight < 500)
}

/**
 Changes the visibility of demo header.
*/
function __changeDemoHeaderVisibility(hide) {
    var displayStyle = "block";
    var heightStyle = "calc(100% - 60px)";
    if (hide) {
        displayStyle = "none";
        heightStyle = "100%"
    }

    var demoHeader = document.getElementById("demoHeader");
    demoHeader.style.display = displayStyle;

    var documentEditorContainer = document.getElementById("documentEditorContainer");
    documentEditorContainer.style.height = heightStyle;
}



// === Localization ===

/**
 Creates the dictionary for localization of application UI.
*/
function __createUiLocalizationDictionary() {
    var tempDialogs = [];
    __createDocumentViewerDialogsForLocalization(tempDialogs);

    var localizationDict = _localizer.getDocumentLocalizationDictionary();
    var localizationDictString = JSON.stringify(localizationDict, null, '\t');
    console.log(localizationDictString);

    var floatingContainer = document.getElementById("documentEditorContainer");
    for (var i = 0; i < tempDialogs.length; i++) {
        floatingContainer.removeChild(tempDialogs[i].get_DomElement());
        delete tempDialogs[i];
    }
}

/**
 Creates the dialogs, which are used in Web Document Editor, for localization.
*/
function __createDocumentViewerDialogsForLocalization(tempDialogs) {
    var floatingContainer = document.getElementById("documentEditorContainer");

    var documentTextPropertiesDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentTextPropertiesDialogJS();
    documentTextPropertiesDialog.render(floatingContainer);
    tempDialogs.push(documentTextPropertiesDialog);

    var documentParagraphPropertiesDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentParagraphPropertiesDialogJS();
    documentParagraphPropertiesDialog.render(floatingContainer);
    tempDialogs.push(documentParagraphPropertiesDialog);

    var documentParagraphIndentationSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentParagraphIndentationSettingsDialogJS();
    documentParagraphIndentationSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentParagraphIndentationSettingsDialog);

    var documentParagraphLineSpacingSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentParagraphLineSpacingSettingsDialogJS();
    documentParagraphLineSpacingSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentParagraphLineSpacingSettingsDialog);

    var documentParagraphPaginationSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentParagraphPaginationSettingsDialogJS();
    documentParagraphPaginationSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentParagraphPaginationSettingsDialog);

    var documentInfoDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentInfoDialogJS();
    documentInfoDialog.render(floatingContainer);
    tempDialogs.push(documentInfoDialog);

    var documentEditorSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentEditorSettingsDialogJS();
    documentEditorSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentEditorSettingsDialog);

    var documentEditorViewSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentEditorViewSettingsDialogJS();
    documentEditorViewSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentEditorViewSettingsDialog);

    var documentPageSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentPageSettingsDialogJS();
    documentPageSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentPageSettingsDialog);

    var documentPageColumnsSettingsDialog = new Vintasoft.Imaging.Office.UI.Dialogs.WebUiDocumentPageColumnsSettingsDialogJS();
    documentPageColumnsSettingsDialog.render(floatingContainer);
    tempDialogs.push(documentPageColumnsSettingsDialog);
}

/**
 Enables the localization of application UI.
*/
function __enableUiLocalization() {
    // localize DOM-elements of web page
    _localizer.localizeDocument();

    // subscribe to the "dialogShown" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "dialogShown", function (event, data) {
        _localizer.localizeDocument();
    });
}



// === Main ===

/**
 Main function.
*/
function __main() {
    // set the session identifier
    var hiddenSessionFieldElement = document.getElementById('hiddenSessionField');
    Vintasoft.Shared.WebImagingEnviromentJS.set_SessionId(hiddenSessionFieldElement.value);

    // specify web services, which should be used in this demo ("defaultImageCollectionService" and "defaultImageService" are necessary for printing functionality only)

    Vintasoft.Shared.WebServiceJS.defaultFileService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftFileApi");
    Vintasoft.Shared.WebServiceJS.defaultOfficeService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftOfficeApi");
    Vintasoft.Shared.WebServiceJS.defaultImageCollectionService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftImageCollectionApi");
    Vintasoft.Shared.WebServiceJS.defaultImageService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftImageApi");

    // create UI localizer
    _localizer = new Vintasoft.Shared.VintasoftLocalizationJS();
    // if localizer is ready (localizer loaded localization dictionary)
    if (_localizer.get_IsReady()) {
        // execute the second part of main function
        __main2();
    }
    // if localizer is NOT ready
    else {
        // wait when localizer will be ready
        Vintasoft.Shared.subscribeToEvent(_localizer, "ready", function () {
            // execute the second part of main function
            __main2();
        });
    }
}

/**
 Main function (second part).
 This function must be executed when UI localizer is ready.
*/
function __main2() {
    // create settings for web document editor
    var documentEditorSettings = new Vintasoft.Imaging.Office.UI.WebDocumentEditorSettingsJS("documentEditorContainer", "documentEditor");

    // create the web document editor
    _documentEditor = new Vintasoft.Imaging.Office.UI.WebDocumentEditorJS(documentEditorSettings);

    // specify that web document editor has touch screen if application is executing on mobile device
    _documentEditor.set_HasTouchScreen(__isTouchDevice());

    // subscribe to the "warningOccured" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "warningOccured", __documentEditor_warningOccured);
    // subscribe to the "synchronizationException" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "synchronizationException", __documentEditor_synchronizationException);
    // subscribe to the asyncOperationStarted event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "asyncOperationStarted", __documentEditor_asyncOperationStarted);
    // subscribe to the asyncOperationFinished event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "asyncOperationFinished", __documentEditor_asyncOperationFinished);
    // subscribe to the asyncOperationFailed event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "asyncOperationFailed", __documentEditor_asyncOperationFailed);
    // subscribe to the "saveChangesRequest" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "saveChangesRequest", __documentEditor_saveChangesRequest);
    // subscribe to the "textEditingStarting" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "textEditingStarting", __documentEditor_textEditingStarting);
    // subscribe to the "textEditingFinished" event of document editor
    Vintasoft.Shared.subscribeToEvent(_documentEditor, "textEditingFinished", __documentEditor_textEditingFinished);

    // subscribe to the "resize" event of window
    window.onresize = __window_resize;
    // change the visibility of demo header
    __changeDemoHeaderVisibility(window.innerHeight < 500);

    // wait while web page will be loaded
    $(document).ready(function () {
        //// create the dictionary for localization of application UI
        //__createUiLocalizationDictionary();

        // enable the localization of application UI
        __enableUiLocalization();

        // open the default document
        __openDefaultDocument();
    });
}



// run main function
__main();
