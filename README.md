# VintaSoft ASP.NET Core Document Editor Demo

This ASP.NET Core project uses <a href="https://www.vintasoft.com/vsimaging-dotnet-index.html">VintaSoft Imaging .NET SDK</a>.
The client-side of project uses HTML+JavaScript+CSS. The server-side of project uses ASP.NET Core API controllers.<br />
<br />
The project demonstrates how to edit new or existing DOCX document in ASP.NET Core:
* JavaScript UI control that works in all major HTML5 web browsers
* User interface is compatible with personal computers, tablets and smartphones
* Create new or load an existing DOCX document
* View and edit DOCX document:
* Add/change/delete text content in document
* Change text properties (font, font size, bold, italic, text color, ...) in a document
* Change paragraph properties (style, text alignment, text indent, list style, ...) in a document
* Insert/delete page break
* Add/edit/delete header or footer
* Change page settings
* Change settings of page columns
* Print DOCX document
* Download edited DOCX document or export DOCX document as PDF document
* "Standard" dialogs (text properties, paragraph properties, etc) for Bootstrap and JQuery UI
* User interface can be customized
* User interface is available in 45 languages and can be easily translated into any language* The application UI is localized into 45 languages (Afrikaans, Arabic, Armenian, Azerbaijan, Belarusian, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greece, Hebrew, Hindi, Hungarian, Italian, Japanese, Kazakh, Korean, Kyrgyz, Latvian, Lithuanian, Norwegian, Portugese, Romanian, Russian, Slovakian, Slovenian, Spanish, Swahili, Swedish, Tajik, Tatar, Turkish, Turkmen, Ukrainian, Uzbek, Vietnamese, Zulu).


## Screenshot
<img src="vintasoft_aspnet.core-document_editor_demo.png" title="VintaSoft ASP.NET Core Document Editor Demo"><br />


## Usage
1. Get the 30 day free evaluation license for <a href="https://www.vintasoft.com/vsimaging-dotnet-index.html" target="_blank">VintaSoft Imaging .NET SDK</a> as described here: <a href="https://www.vintasoft.com/docs/vsimaging-dotnet/Licensing-Evaluation.html" target="_blank">https://www.vintasoft.com/docs/vsimaging-dotnet/Licensing-Evaluation.html</a>

2. Update the evaluation license in "src\Startup.cs" file:
   ```
   Vintasoft.Imaging.ImagingGlobalSettings.Register("REG_USER", "REG_EMAIL", "EXPIRATION_DATE", "REG_CODE");
   ```

3. Build the project ("AspNetCoreDocumentEditorDemo.Net10.csproj" file) in Visual Studio or using .NET CLI:
   ```
   dotnet build AspNetCoreDocumentEditorDemo.Net10.csproj
   ```

4. Run compiled application and try to edit new or existing DOCX document.


## Documentation
VintaSoft Imaging .NET SDK on-line User Guide and API Reference for Web developer is available here: https://www.vintasoft.com/docs/vsimaging-dotnet-web/


## Support
Please visit our <a href="https://myaccount.vintasoft.com/">online support center</a> if you have any question or problem.
