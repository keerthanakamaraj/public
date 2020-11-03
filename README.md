# RLO UI

This project was created from Base libraries of Olive Fabric

## Development server

Run `start-server.bat` for a dev server. Navigate to `http://localhost:1841/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Build Command for Demo Deployment

```sh
ng build --configuration demo --base-href /rlo/ --sourceMap=true
```

Build Command for Canara IUT Deployment

```sh
ng build --configuration canara-iut --base-href /rlo/ --sourceMap=true
```


## Tools for development

##### Required 
- NodeJS ( Validate version with package.json )

##### Recommended
- [Visual Studio Code](https://code.visualstudio.com/)
  
  Recommended Plugins for Visual Studio Code
  - [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
  - [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
  - [EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [XML Tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml)


## Coding Standards

### Angular Coding Standards

##### Basic code hygiene
- It's recommended to follow [Angular Coding Standards & styles guide](https://angular.io/guide/styleguide) 
- Code should be devided into moduler reusable functions / class / service / pipes with proper accessor and return types
- **NO** inline script / styles to be part of htmls / templates. All Scripts to be part of .ts and all styles to be part of .scss   
- **Avoid** duplication of code using copy-paste
- **NO** names should be added to the code.
- All debug logs should be **removed** once functionality is complete
- **Naming Standards** Variable, Function, Component, Module names should be Self-explanatory

### Code Formatting

- Code should be formatted before every commit.
- [.editorconfig](.editorconfig) maintains the formatting standards for css, scss, html, ts, js, etc.

## Components

### UI Components

- FormComponent (OF) - Base form component, All Form Components should extend this class
- FieldComponent (OF) - Base Field Compoenent, All Field Components should extend this class
  - ComboBoxComponent ( OF ) - Component for Dropdowns ( by default as typeahead )
  - TextBoxComponent ( OF ) - Component for TextBox
  - TextAreaComponent ( OF ) - Component for TextArea
  - CheckBoxComponent ( OF ) - Component for Check Box
  - HiddenComponent ( OF ) - Component for Hidden Fields on the form
  - FileuploadComponent ( OF ) - Component for File Uploads
  - DateComponent ( OF ) - Component for Date Picker
  - ButtonComponent ( OF ) - Component for Button
  - AmountComponent ( OF ) - Component for Capturing Amount Fields
  - ReadOnlyComponent ( RLO ) - Component for Read Only Fields ( Shown as Text with Labels instead of Textbox with disabled state )
  - RLOUIRadioComponent ( RLO ) - Component for Radio Buttons
- ReadonlyGridComponent ( Wrapper over [AgGrid](https://www.ag-grid.com/documentation-main/documentation.php) ) - Component for Creating Grids ( Tables )
- RloUiAccordionComponent & RloUiAccordionGroupComponent ( RLO ) - Component for Accordion styles
- RLOUIHandlerComponent ( RLO ) - Handler Component to be used for customization in Fluid Page generated form component codes

### Services

- service-stock ( OF ) - Base Service for easy access
  - RoutingService ( OF ) - Service for Routing
  - ProvidehttpService ( OF ) - Service for http calls
  - Data ( OF ) - 
  - TranslateService ( OF ) - Service for i18n
  - AlertsService ( OF ) - Service for Alerts ( user alert messages like success / failure )
  - RlouiService ( RLO ) - Service for Overirding Base component by OF for supporting multi-tenancy
    - Field Validations
    - Amount Formatter
    - Date Formatter 
    - Caching ( Pending )

## Further help ( Angular )

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
