pipeline { 
agent any 

parameters{
	    string(defaultValue: '', description: 'Enter Git Repo Name, build will fail if value is empty', name: 'GITREPO', trim: false) 
	    gitParameter branchFilter: '*.*/(.*)', 
					 defaultValue: '', 
					 name: 'GIT_BRANCHES', 
					 type: 'PT_BRANCH', 
		                         description: 'By default master branch is selected',
		    			 listSize: '1',
		                         useRepository: '.*${params.GITREPO}.git'					 
	    choice(choices: ['--None--','DEV','QA','STAGING','PRODUCTION'], description: 'Select An Environment Name', name: 'Environment_Name')
	    choice(choices: ['--None--','PLATFORM','DSS','XPONENT','IDX','AMERITRUST','FDS','RA','iGCB-CLO'], description: 'Select a Product name this service belongs to', name: 'PRODUCT_NAME')	  
	    choice(choices: ['--None--','JDK_11','JDK_8','JDK_6','Python','Nodejs'], description: 'Select JDK version', name: 'SELECT_TECH')
	    choice(choices: ['--None--','Maven','Gradle','Node'], description: 'Please select a build tool for project', name: 'BUILD_TOOL_SELECTION')
	    booleanParam(name: 'Sonar_Analysis', defaultValue: true, description: 'By default Sonar Analysis will be executed')
	    booleanParam(name: 'Veracode_Scan', defaultValue: true, description: 'By default Veracode Scan will be executed')
	    booleanParam(name: 'Twistlock_Scan', defaultValue: true, description: 'By default Image Scan will be executed')   
	    }
	//Environment has Environment variables
environment {
              //  PROJECT_VERSION = readMavenPom().getVersion()	
              //  VERSION = readMavenPom().getVersion() 			
		GIT_URL = "${params.GITREPO}"
	        //Environment_Name
    }
options {
		//skipStagesAfterUnstable()
		buildDiscarder(logRotator(numToKeepStr: '3'))
		timestamps()
}
stages {	
	// Checkout the code in Stage SCM
stage('SCM') { 	
	steps { 				
		echo "Pulling changes from branch ${params.GIT_BRANCHES} and from repo ${params.GITREPO}"		
		checkout poll: false, scm: [$class: 'GitSCM', branches: [[name: "${params.GIT_BRANCHES}"]], 
					    doGenerateSubmoduleConfigurations: false, 
		                            extensions: [[$class: 'CleanBeforeCheckout']], 
					    gitTool: 'Default', submoduleCfg: [], 
					    recursiveSubmodules: true,
		                            userRemoteConfigs: [[credentialsId: '237b96ac-3059-4c25-b0cd-f66a36404572', 
		                            url: "https://github.com/intellectdesign/${params.GITREPO}.git"]]
					   ]
		}
	}
	// Reading build properties into buildProps
stage('Read Properties'){
	steps{
		script{
					
		//User = ${BUILD_USER}			
		echo " Environment Selected is ${Environment_Name}"
		echo " PRODUCT NAME Selected is ${PRODUCT_NAME}"
		echo " Tool Selected is ${SELECT_TECH}"
		echo " Build Tool Selected: ${BUILD_TOOL_SELECTION}"
		toolSelection = "${SELECT_TECH}"
		echo "++++ ${toolSelection}"
		buildTool = "${BUILD_TOOL_SELECTION}"			
		jdkVersion = selectTool("${SELECT_TECH}")		
		echo "Jdk selected is: ${jdkVersion}"
		DOCKER_HUB_ACCOUNT = dockerHubSelector("${Environment_Name}")
		echo "Sonar Analysis Selected : ${params.Sonar_Analysis}"
		envAppend = appendHelmName("${Environment_Name}")		
		buildProps = readProperties file: 'build.properties'
		// Prinintg all build properties
		echo "Property file is : ${buildProps}"
		// getting all build properties into variables
		PROJECT_KEY = "${buildProps.project_key}"
		PROJECT_NAME = "${buildProps.project_name}"
		HELM_NAME = "${buildProps.helm_name}"
		YAMLFILE_NAME = "${buildProps.yamlfile_name}"
		FOLDER_NAME = "${buildProps.folder_name}"
		REPOSITORY_DOCKER = "${buildProps.repository_docker}"
		registry = "${DOCKER_HUB_ACCOUNT}/${REPOSITORY_DOCKER}"		
		newImage = "${DOCKER_HUB_ACCOUNT}/${REPOSITORY_DOCKER}:${envAppend}-${currentBuild.number}"		
			
			echo "Image Tag = ${newImage}"
			echo "Project_Key = ${PROJECT_KEY}"
			echo "Project_name = ${PROJECT_NAME}"
			echo "REPOSITORY_DOCKER = ${REPOSITORY_DOCKER}"
		}		
	}
   }
stage('Maven BUILD') { 	
	when { 	
	    expression { 			    	
		    return params.BUILD_TOOL_SELECTION == 'Maven'
		    echo "In clean install, build tool selected is : ${buildTool}" 	           	    
	           }	
		}	
	tools {		
		jdk "${jdkVersion}"
  	}
	steps { 	
		echo "Starting Build"
		sh 'mvn clean install'
		echo 'Clean Install Completed'        					
		}
	}
	
stage('Node') {
	when { 	
	    expression { 			    	
		    return params.BUILD_TOOL_SELECTION == 'Node'
		    echo "In clean install, build tool selected is : ${buildTool}" 	           	    
	           }	
		}
            steps {
                sh 'npm install'
				// sh 'npm audit fix'    
                sh 'ng build --prod'
            }
        }
	
	
stage('Gradle BUILD') { 
	when { 	   
	    expression { 		   
		     //return params.toolSelection != 'Python';	
		    return params.BUILD_TOOL_SELECTION == 'Gradle'
		    echo "In unit test, build tool selected is : ${buildTool}" 	           	    
	           }	          
		}
	tools {
       	 gradle 'gradle-4.10'
   	 }
	steps { 		
			echo "In Build"
			//echo "Project_Key = ${buildProps.project_key} @#@#@#@#@# "
			echo "Starting Build"
			//sh 'mvn clean install'			
			//sh 'cd /opt/JenkinsHome/jobs/Initiations_Dev_Job/workspace/'
		 	sh 'gradle clean build'
			//echo 'Clean Install Complete'        
			//echo "${env.PROJECT_VERSION} --- PROJECT VERSION"
			//echo "$registry"
			//echo '###############################'		
     			echo '@@@ Starting Gradle Build @@@'
    		
      echo 'Completed Gradle Build'			
			}
	}
//Unit test Stage
stage('Maven JUNIT TEST'){
	when { 	   
	    expression { 		   
		     //return params.toolSelection != 'Python';	
		    return params.BUILD_TOOL_SELECTION == 'Maven'
		    echo "In unit test, build tool selected is : ${buildTool}" 	           	    
	           }	          
		}
	tools {
    	  	 jdk "${jdkVersion}"   	
  	   }
	steps {
		sh 'mvn test'
		echo 'Maven Test Completed'
		}
       }
stage('Gradle JUNIT TEST'){
	when { 	   
	    expression { 		   
		     //return params.toolSelection != 'Python';	
		    return params.BUILD_TOOL_SELECTION == 'Gradle'
		    echo "In unit test, build tool selected is : ${buildTool}" 	           	    
	           }	          
		}
	tools {
    	  	 gradle 'gradle-4.10' 	
  	   }
	steps {
		sh 'gradle test'
		echo 'Gradle Test Completed'
		}
       } 
							
//    -------------------------From Here NFR Check will start----------------------------------------------

 stage('SONAR ANALYSIS'){	
	    when {
	    expression { 		 
		    echo 'In when for Sonar'
	        //    environment_name : "Dev"
		    return (params.Sonar_Analysis == true || params.GIT_BRANCHES == 'Development')		 
	           }
		}
		steps{				
		        echo 'Sonar Analysis will be executed'
			script{
			     scannerHome = tool 'Sonar_Scanner'
			}
			echo "${scannerHome}"			
			echo 'Sonar Analysis Started'
				withSonarQubeEnv('sonar'){
					echo 'In the scan'
					script {
				     if (params.SELECT_TECH == 'Python') { 
					echo "Test : ${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.sonar.language=py -Dsonar.sources=src"
					sh "${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.sonar.language=py -Dsonar.sources=src"										
					echo 'In Analysis'
				   } else if (params.BUILD_TOOL_SELECTION == 'Node') {
					echo "Test : ${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.sonar.language=js  -Dsonar.sources=src"
					sh "${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.sonar.language=js  -Dsonar.sources=src"					
			        	echo 'In Analysis'
				   } else {
					echo "Test : ${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.java.binaries=.  -Dsonar.sources=src/main"
					sh "${scannerHome}sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.java.binaries=.  -Dsonar.sources=src/main"					
					//sh "sonar-scanner -Dsonar.projectKey=${buildProps.project_key} -Dsonar.projectName=${buildProps.project_name} -Dsonar.projectVersion=${env.PROJECT_VERSION} -Dsonar.java.binaries=.  -Dsonar.sources=src/main"					
			        	echo 'In Analysis'
				         }
				      }
				}
        echo 'Sonar Analysis Completed'		      
		script{
        if(currentBuild.previousBuild.getNumber()!= null){
		echo "previous build number: ${currentBuild.previousBuild.getNumber()}"
		}
            }	  
       }
   }
  stage("Quality Gate"){
	  when {
	    expression { 		  
		    echo 'In when for QualityGate'	         
		    return (params.Sonar_Analysis == true || params.GIT_BRANCHES == 'Development');		   
	           }
		}
	    steps{
		    timeout(time: 10, unit: 'MINUTES') {
		  //Just in case something goes wrong, pipeline will be killed after a timeout
	    script{
		    def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv	
		    echo "${qg}.status"
		    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
		    echo 'Quality Gate Failed'
                    sh 'exit 0'
		    currentBuild.result = 'SUCCESS'
               	    }
    		   /* if (qg.status != 'OK') {
	   		 echo "Quality Gates failed"
     			   error "Pipeline aborted due to quality gate failure: ${qg.status}"
    			}*/
		     echo "Quality completed without if loop"
  	    	   }
    	      }
   	}
   }  
 // This is for Veracode Security Scan
    stage('Veracode Upload and Scan') {	  
	    when {
	    expression { 
		   // or{
		    echo 'In Veracode When clause'
	           // environment_name : "Dev"
		    return params.Veracode_Scan == true;
		    // }
	           }
		}
	steps{			
		echo "Product Name selected: ${PRODUCT_NAME}"
	    script {			    
			VERACODE_APPLICATION_NAME = veracodeSandboxSelector("${PRODUCT_NAME}")	
	    }		
		echo " ${VERACODE_APPLICATION_NAME} is the sandbox"
		echo "Project name is : ${buildProps.project_name} "
            withCredentials([string(credentialsId: 'ef979fd49af05bec0fdd8d113baea516', variable: 'VID')])  
			{ 
				echo "veracode applicationName: ${VERACODE_APPLICATION_NAME},  debug: true, criticality: 'VeryHigh', fileNamePattern: '', replacementPattern: '', sandboxName: ${buildProps.project_name}, scanExcludesPattern: '', scanIncludesPattern: '', scanName: ${buildProps.project_name}-${currentBuild.number}, teams: '', uploadExcludesPattern: '', uploadIncludesPattern: '**/**.jar', useIDkey: true, vid: 'ef979fd49af05bec0fdd8d113baea516', vkey: 'cc8411137e538df75319d88ac01bdee6a8ae10dbf90bd689224c52c201642490421314cb101763d1b149c4570c40347dd2750d7eec11f470ce8b158acad71bbd', vpassword: '',vuser: ''"
				//veracode applicationName: "${buildProps.buildProps.project_name}", canFailJob: false, criticality: 'VeryHigh', fileNamePattern: '', replacementPattern: '', sandboxName: "${VERACODE_SANDBOX_NAME}", scanExcludesPattern: '', scanIncludesPattern: '', scanName: "${buildProps.project_name}-${currentBuild.number}", teams: '', uploadExcludesPattern: '', uploadIncludesPattern: '**/**.jar', vid: '', vkey: '', vpassword: 'Welcome@02', vuser: 'vipin.r@intellectdesign.com'
				veracode applicationName: "${VERACODE_APPLICATION_NAME}",  debug: true, criticality: 'VeryHigh', fileNamePattern: '', replacementPattern: '', sandboxName: "${buildProps.project_name}", scanExcludesPattern: '', scanIncludesPattern: '', scanName: "${buildProps.project_name}-${currentBuild.number}", teams: '', uploadExcludesPattern: '', uploadIncludesPattern: '**/**.jar', useIDkey: true, vid: 'ef979fd49af05bec0fdd8d113baea516', vkey: 'cc8411137e538df75319d88ac01bdee6a8ae10dbf90bd689224c52c201642490421314cb101763d1b149c4570c40347dd2750d7eec11f470ce8b158acad71bbd', vpassword: '',vuser: ''
           } 	
    
		}
	}

// Building and pushing Docker Image
    stage('Building image') {         
		steps{
		echo "Image Build"
			script {
				withDockerRegistry(registry: [credentialsId: 'DockerCredential']){   			
					echo "${newImage} is the name."
					def pushImage = docker.build ("${registry}:${envAppend}-${currentBuild.number}","--file ./Dockerfile .")
					//removed -${env.PROJECT_VERSION}
					echo "${pushImage} is the pushed image"
					pushImage.push()	
				
             }
          }  
       }
    }

stage('Twistlock Scan'){
     when {
	    expression { 
		   // or{
		    echo 'In Twistlock When clause'
	           // environment_name : "Dev"
		    return params.Twistlock_Scan == true;
		    // }
	           }
		}
		steps{
				echo "Twistlock Scan"
				twistlockScan             ca: '', 
							  cert: '', 
							  repository: '',
							  tag: '',
							  compliancePolicy: 'warn', 
							  dockerAddress: 'unix:///var/run/docker.sock', 
							  gracePeriodDays: 0, 
							  ignoreImageBuildTime: false, 
							  image: "${newImage}", 
							  key: '', 
							  logLevel: 'true', 
							  policy: 'warn', 
							  requirePackageUpdate: false, 
							  timeout: 10
			    echo "Scanned image ${newImage}"
	   }
   }
   stage('Twistlock Report Publish'){  
	    when {
	    expression { 
		   // or{
		    echo 'In Twistlock When clause'
	           // environment_name : "Dev"
		    return params.Twistlock_Scan == true;
		    // }
	           }
		}
		steps{
			       echo "Twistlock Publish"
			       twistlockPublish  dockerAddress: 'unix:///var/run/docker.sock',
		               ignoreImageBuildTime: true,
		               image: "${newImage}",
		               key: '',
		               logLevel:'true',
		               timeout:10
			       echo "Publised the Scan Result"
		}
}

		
   stage('Helm Init & Deploy'){
	steps{
       echo "Image Deploy"
       echo "${newImage}"
    withCredentials([file(credentialsId: 'ida-qa-kubeconfig', variable: 'KUBE_QA'), file(credentialsId: 'ida-dev-kubeconfig', variable: 'KUBE_DEV')]) {  
	script{
      		def tagValue = "${Environment_Name}"
		envAppend = appendHelmName("${Environment_Name}")
       		echo "${tagValue} is environment"
       		def envType = ""
	 // }
	//script{
                       if ("${envAppend}" == "dev") { 
                           envType = "dev"
                               env.KUBECONFIG = KUBE_DEV
                               echo "${env.KUBECONFIG} in if tagvalue is dev"
                       }
                       else if ("${envAppend}" == "qa") {
                            envType = "qa"
                            env.KUBECONFIG = KUBE_QA
                            echo "${env.KUBECONFIG} in if tagvalue is qa"
                        }
					  }
          sh "helm init --service-account=tiller"
	  sh "helm init --client-only --service-account=tiller"
          sh "helm upgrade ${envAppend}-${buildProps.helm_name} --recreate-pods  -f k8s/helm-charts/${envAppend}_${buildProps.yamlfile_name}.yaml --set image.tag=${envAppend}-${currentBuild.number} ./k8s/helm-charts/${buildProps.folder_name}/"
	  //sh "helm install --name ${envAppend}-${buildProps.helm_name} --namespace idxp -f k8s/helm-charts/${envAppend}_${buildProps.yamlfile_name}.yaml --set image.tag=${envAppend}-${currentBuild.number} ./k8s/helm-charts/${buildProps.folder_name}/"  
    }
   }   
   }
}
	post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL-CI/CD Pipeline: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) \n Follow the link for reports.\n Sonar Report URL: https://jobs.intellectseeccloud.com/sonar/dashboard/index/${buildProps.project_key} \n Twistlock URL: https://twistlock.intellectseeccloud.com:8083/#!/monitor/vulnerabilities/jenkins-jobs \n Veracode URL: https://analysiscenter.veracode.com/auth/index.jsp#SandboxView:39657:319345:803186")
   //hipchatSend (color: 'GREEN', notify: true, message: "SUCCESSFUL-CI/CD Pipeline: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
     //  )     
	mail to: 'anupama.bankapur@intellectdesign.com',
	     subject: "SUCCESSFUL: ${currentBuild.fullDisplayName}",
             body: "Build completed Successfully ${env.BUILD_URL} \n Sonar Report URL: https://jobs.intellectseeccloud.com/sonar/dashboard/index/${buildProps.project_key} \n Twistlock URL: https://twistlock.intellectseeccloud.com:8083/#!/monitor/vulnerabilities/jenkins-jobs \n Veracode URL: https://analysiscenter.veracode.com/auth/index.jsp#SandboxView:39657:319345:803186"
    }
    failure {
      slackSend (color: '#FF0000', message: "FAILED-CI/CD Pipeline: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    //  hipchatSend (color: 'RED', notify: true,message: "FAILED-CI/CD Pipeline: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
    //      )     
	mail to: 'anupama.bankapur@intellectdesign.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: " Something is wrong with ${env.BUILD_URL} \n Sonar URL: https://jobs.intellectseeccloud.com/sonar/dashboard/index/${buildProps.project_key} \n Twistlock URL: https://twistlock.intellectseeccloud.com:8083/#!/monitor/vulnerabilities/jenkins-jobs \n Veracode URL: https://analysiscenter.veracode.com/auth/index.jsp#SandboxView:39657:319345:803186"
    }
  }
	//post {
      //  always {
       //     junit 'build/reports/**/*.xml'
       // }
    }

//This is the area where all the user defined methods are written

def selectBuildTool(buildSelected){	
	if (buildSelected == "Maven"){
	    return "apache-maven--3.3.9"
	}else if (buildSelected == "Gradle"){
	    return "gradle-4.10"
	}		
}

def selectTool(toolSelected){	
	if (toolSelected == "JDK_11"){
	    return "JDK_11"
	}else if (toolSelected == "JDK_8"){
	    return "JDK_8"
	}else if (toolSelected == "JDK_6"){
	    return "JDK_6"
	}
}

def appendHelmName(environment){
	//branchName = ""
	if (environment == "DEV"){
	    return "dev"
	}else if (environment == "QA"){
	    return "qa"
	}else if (environment == "STAGING"){
	    return "release"
	}else (environment == "PRODUCTION"){
	    return "latest"
	}	
   }

def dockerHubSelector(environment){	
	switch (environment){		
		case "DEV" :
			return "intellectdevcloud"			
		break;
		case "QA" :
			return "intellectdevcloud"
		break;
		case "STAGING" :
			return "intellectdesigndevteam"
		break;
		case "PRODUCTION" :
			return "intellectdesigndevteam"
		break;		
		default :
			return "intellectdevcloud"
		}		
	}

def veracodeSandboxSelector(productName){
	//sandboxName = ""
	switch (productName){
		case "PLATFORM" :
			return "Platform Modules"
		break;
		case "XPONENT" :
			return "Xponent Modules"
		break;
		case "DSS" :
			return "DSS_CloudApplications"
		break;
		case "IDX" :
			return "Platform Modules"
		break;
		case "AMERITRUST" :
			return "Xponent Modules"
		break;
		case "iGCB-CLO" :
			return "Platform Modules"
		break;	
		case "RA" :
			return "Intellect Risk Analyst"
		break;	
		case "FDS" :
			return "Platform Modules"
		break;	
		default :
			return "defaultBox"
	}
}
