const oracledb = require('oracledb');
const fs = require('fs');
const USERID = 'venkat.sammeta';
const USER = 'RLOCONFIG';
const PASSWORD = 'RLOCONFIG'
const HOST = '10.120.101.58';
const PORT = '1521';
const SERVICE_NAME = 'SIR19402';


oracledb.autoCommit = true;
oracledb.getConnection({
     user: USER,
     password: PASSWORD,
     connectString: '( DESCRIPTION =( ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = ' + HOST + ')(PORT = ' + PORT + ')))( CONNECT_DATA =(SERVICE_NAME = ' + SERVICE_NAME + ')))',
},
     function (err, connection) {
          if (err) {
               console.error("Unable to connect the DataBase");
               console.error(err.message);
               return;
          }
          async function recursivelyCall() {
               await emiteAnEvent(connection)

          }
          recursivelyCall();
     });

async function emiteAnEvent(connection) {
     var imports = [];
     var Path = [];
     var loadChildren = [];
     try {
          let processId = '123';
          let result3 = await connection.execute(`select filepath , filedata as c from ProcessCompdtls where ProcesssId= :pId`, [processId], { fetchInfo: { "C": { type: oracledb.STRING } } });
          for (var i = 0; i < result3.rows.length; i++) {
               console.log('New file found : ' + result3.rows[i][0]);
               createComponent(result3.rows[i][0], result3.rows[i][1]);
          }

          let result2 = await connection.execute(`select Path , loadChildren  from ProcessRoutedtls where ProcesssId= :Id`, [processId]);
          for (var i = 0; i < result2.rows.length; i++) {
               console.log('New route found for :' + result2.rows[i][0]);
               Path.push(result2.rows[i][0]);
               loadChildren.push(result2.rows[i][1]);
          }

          let result4 = await connection.execute(`select langcode ,langdtls as c from ProcessLangdtls where ProcesssId= :Id`, [processId], { fetchInfo: { "C": { type: oracledb.STRING } } });
          for (var i = 0; i < result4.rows.length; i++) {
               console.log('New lang json found for :' + result4.rows[i][0]);
               langEditer(result4.rows[i][0], result4.rows[i][1]);
          }
          // let result1 = await connection.execute(`select * from ProcessImportdtls where ProcesssId= :Id`, [processId]);
          // for (var i = 0; i < result1.rows.length; i++) {
          //      imports.push(result1.rows[i][1]);
          // }
          // modefiAppModel(imports);
          if (result3.rows.length > 0 || result2.rows.length > 0 || result4.rows.length > 0) {
               setTimeout(() => {
                    if (result3.rows.length > 0) {
                         connection.execute(`DELETE from ProcessCompdtls where ProcesssId= :PId`, [processId]);
                    }
                    if (result2.rows.length > 0) {
                         routModel(Path, loadChildren);
                         connection.execute(`DELETE from ProcessRoutedtls where ProcesssId= :PId`, [processId]);
                    }
                    if (result4.rows.length > 0) {
                         connection.execute(`DELETE from ProcessLangdtls where ProcesssId= :PId`, [processId]);
                    }
                    setTimeout(() => {
                         emiteAnEvent(connection);
                    }, 1000);
               }, 6000);
          }
          else {
               setTimeout(() => {
                    emiteAnEvent(connection);
               }, 4000);
          }
     }
     catch (err) {
          console.log(err);
          console.error("cannot asses table ProcessCompdtls ,ProcessImportdtls ,ProcessRoutdtls ,ProcessLangdtls");
          doRelease(connection);
          return;
     }
     finally {
     }
}


function createComponent(path, data) {
     var fileName = path.split('/');
     var temp = fileName[0];
     createFolder(temp);
     for (var i = 1; i < fileName.length - 1; i++) {
          temp = temp + "/" + fileName[i];
          createFolder(temp);
     }
	if(data == null || data == undefined || data.trim() == 'null'){
	data = "";
}
     fs.writeFileSync(path, data, (err) => {
          if (err) {
               console.log("unable to write a file in" + path)
               console.error(err);
          }
          console.log('The file has been created in ' + path);
     });
}

function langEditer(langCode, data) {
     var path = "src/assets/i18n"
     var mainPath = path + "/" + langCode + ".json";
     var key;
     try {
          if (fs.existsSync(mainPath)) {
               var destBuffer = "";
               var buffer = fs.readFileSync(mainPath, 'utf8', function (err) { if (err) { console.log(err.message); } });
               var fileJson = JSON.parse(buffer);
               var langJson = JSON.parse("{" + data + "}");
               for (key in langJson) {
                    fileJson[key] = langJson[key];
               }
               destBuffer = JSON.stringify(fileJson, null, "\t");
               fs.writeFileSync(mainPath, destBuffer, (err) => {
                    if (err) {
                         console.log("unable to write a file in" + mainPath)
                         console.error(err);
                    }
                    console.log('Unable to update file in ' + mainPath);
               });

          }
          else {
               data = "{\n" + data + "\n}";
               fs.writeFileSync(mainPath, data, (err) => {
                    if (err) {
                         console.log("unable to write a file in" + mainPath)
                         console.error(err);
                    }
                    console.log('The file has been created in ' + mainPath);
               });

          }
     } catch (err) {
          console.error("Unable to modefi file " + langCode + ".json");
          return;
     }

}


function routModel(PathList, loadChildrenList) {
     var appPath = "src/app/route-mapping.ts"
     var importCopy = [];
     var routCopy = PathList.slice();
     var line;
     var buffer1 = "";
     var buffer2 = "";
     var buffer3 = "";
     var buffer1Bol = true;
     var buffer2Bol = false;
     var buffer3Bol = false;
     var lineContaneComa = false;
     try {

          var buffer = fs.readFileSync(appPath, 'utf8', function (err) { if (err) { console.log(err.message); } });
          line = buffer.split('\n').map(function (val) { return val; });
          for (var i = 0; i < line.length; i++) {
               if (contanesAlpha(line[i])) {
                    if (line[i].length > 0) {
                         if (buffer1Bol) {
                              if (line[i].indexOf("import") > -1) {
                                   buffer1 = buffer1 + line[i];
                                   buffer1 = buffer1 + "\n";
                              }
                              else {
                                   buffer1Bol = false;
                                   buffer2Bol = true;
                              }
                         }
                         if (buffer2Bol) {

                              if (line[i].indexOf("];") === -1) {

                                   buffer2 = buffer2 + line[i];
                                   buffer2 = buffer2 + "\n";
                                   if (line[i].indexOf(",") > -1) {
                                        lineContaneComa = true;
                                   }
                                   else {
                                        lineContaneComa = false;
                                   }
                                   for (var j = 0; j < PathList.length; j++) {
                                        if (line[i].indexOf(PathList[j]) > -1) {
                                             if (line[i].indexOf(PathList[j]) > -1 && line[i].indexOf("import") === -1) {
                                                  for (var k = 0; k < routCopy.length; k++) {
                                                       if (routCopy[k] === PathList[j]) {
                                                            routCopy.splice(k, 1);
                                                            loadChildrenList.splice(k, 1);
                                                       }
                                                  }
                                             }
                                        }
                                   }


                              } else {
                                   buffer2Bol = false;
                                   buffer3Bol = true;
                              }
                         }
                         if (buffer3Bol) {
                              buffer3 = buffer3 + line[i];
                              buffer3 = buffer3 + "\n";
                         }
                    }
               }
          }
          for (var k = 0; k < importCopy.length; k++) {
               buffer1 = buffer1 + "import { " + importCopy[k] + "Component } from './" + importCopy[k] + "/" + importCopy[k] + ".Component';\n";
          }
          if (!lineContaneComa) {
               buffer2 = buffer2 + ",";
          }
          for (var k = 0; k < routCopy.length; k++) {

               buffer2 = buffer2 + "{\n";
               buffer2 = buffer2 + "path: '" + routCopy[k] + "',\n";
               buffer2 = buffer2 + "loadChildren: '" + loadChildrenList[k] + "'\n";
               buffer2 = buffer2 + "},\n";
          }
          buffer1 = buffer1 + buffer2 + buffer3;

          fs.writeFileSync(appPath, buffer1, (err) => {
               if (err) {
                    console.log("unable to write app.model.ts")
                    console.error(err);
               }
               console.log('The file has been Updated in app.model.ts');
          });

     } catch (err) {
          console.error("Unable to read file route-mapping.ts");
          return;
     }
}




function modefiAppModel(componentList) {
     var appPath = "src/app/app.module.ts"
     var importCopy = componentList.slice();
     var declarationCopy = componentList.slice();
     var line;
     var buffer1 = "";
     var buffer2 = "";
     var buffer3 = "";
     var buffer4 = "";

     var buffer1Bol = true;
     var buffer2Bol = false;
     var buffer3Bol = false;
     var buffer4Bol = false;
     var lineContaneComa = false;

     try {
          var buffer = fs.readFileSync(appPath, 'utf8', function (err) { if (err) { console.log(err.message); } });
          line = buffer.split('\n').map(function (val) { return val; });
          for (var i = 0; i < line.length; i++) {

               if (contanesAlpha(line[i])) {
                    if (line[i].length > 0) {
                         if (buffer1Bol) {

                              if (line[i].indexOf("import") > -1) {
                                   buffer1 = buffer1 + line[i];
                                   buffer1 = buffer1 + "\n";
                                   for (var j = 0; j < componentList.length; j++) {
                                        if (line[i].indexOf(componentList[j]) > -1) {
                                             if (line[i].indexOf("./" + componentList[j] + "/" + componentList[j] + ".Component") > -1 && line[i].indexOf("import") > -1) {
                                                  for (var k = 0; k < importCopy.length; k++) {
                                                       if (importCopy[k] === componentList[j]) {
                                                            importCopy.splice(k, 1);
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              }
                              else {
                                   buffer1Bol = false;
                                   buffer2Bol = true;
                              }
                         }
                         if (buffer2Bol) {

                              if (line[i].indexOf("declarations") === -1) {
                                   buffer2 = buffer2 + line[i];
                                   buffer2 = buffer2 + "\n";
                              }
                              else {
                                   buffer2Bol = false;
                                   buffer3Bol = true;
                              }
                         }
                         if (buffer3Bol) {
                              if (line[i].indexOf("]") === -1) {
                                   buffer3 = buffer3 + line[i];
                                   buffer3 = buffer3 + "\n";
                                   if (line[i].indexOf(",") > -1) {
                                        lineContaneComa = true;
                                   }
                                   else {
                                        lineContaneComa = false;
                                   }
                                   for (var j = 0; j < componentList.length; j++) {

                                        if (line[i].indexOf(componentList[j]) > -1) {
                                             if (line[i].indexOf("" + componentList[j] + "Component") > -1 && !line[i].indexOf("import") > -1) {
                                                  for (var k = 0; k < declarationCopy.length; k++) {
                                                       if (declarationCopy[k] === componentList[j]) {
                                                            declarationCopy.splice(k, 1);
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              } else {
                                   buffer3Bol = false;
                                   buffer4Bol = true;
                              }

                         }
                         if (buffer4Bol) {

                              if (line.indexOf("]") > -1) {
                                   buffer4 = buffer4 + line[i];
                                   buffer4 = buffer4 + "\n";

                                   for (var j = 0; j < componentList.length; j++) {

                                        if (line[i].indexOf(componentList[j]) > -1) {
                                             if (line[i].indexOf("" + componentList[j] + "Component") > -1 && !line[i].indexOf("import") > -1) {
                                                  for (var k = 0; k < declarationCopy.length; k++) {
                                                       if (declarationCopy[k] === componentList[j]) {
                                                            declarationCopy.splice(k, 1);
                                                       }
                                                  }
                                             }
                                        }
                                   }
                              }
                              else {
                                   buffer4 = buffer4 + line[i];
                                   buffer4 = buffer4 + "\n";
                              }
                         }
                    }
               }
          }
          for (var k = 0; k < importCopy.length; k++) {

               buffer1 = buffer1 + "import { " + importCopy[k] + "Component } from './" + importCopy[k] + "/" + importCopy[k] + ".Component';\n";

          }

          if (!lineContaneComa) {
               buffer3 = buffer3 + ",\n";
          }
          for (var k = 0; k < declarationCopy.length; k++) {
               buffer3 = buffer3 + declarationCopy[k] + "Component,\n";
          }

          buffer1 = buffer1 + buffer2 + buffer3 + buffer4;

          fs.writeFileSync(appPath, buffer1, (err) => {
               if (err) {
                    console.log("unable to write app.model.ts")
                    console.error(err);
               }
               console.log('The file has been Updated in app.model.ts');
          });



     } catch (err) {
          console.error("Unable to read file app.model.ts");
          return;
     }
}
function createFolder(path) {
     try {
          if (!fs.existsSync(path)) {
               fs.mkdirSync(path);
          }
     } catch (err) {
          console.error("Unable to create folder in" + path);
          return;
     }
}

function contanesAlpha(line) {
     let trimString = line.trim();
     if (trimString[0] == '/' & trimString[1] == '/') {
          return false;
     }
     for (var i = 0; i < line.length; i++) {
          if (line.charAt(i) != ' ') {
               return true;
          }
     }
     return false;
}

function doRelease(connection) {
     connection.release(
          function (err) {
               if (err) {
                    console.log("connection was lost with database");
                    console.error(err.message);
               }
          }
     );
}
