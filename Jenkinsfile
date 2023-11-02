pipeline {
  agent any

  environment {
    REGISTRY = 'picmeproject/picme_site'
    EC2_INSTANCE_IP = '34.228.14.4'
    DOCKER_USERNAME = 'picmeproject'
    DOCKER_PASSWORD = 'Ventania12#'
    DOCKER_RM_SCRIPT = 'sudo docker rm -f $(docker ps -aq)'
    BUILD_NUMBER_FILE = 'build_number.txt'
  }

  stages {
    // stage('Docker install and login') {
    //   steps {
    //     script {
    //       sh "apt-get install docker.io"
    //       // sh "sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
    //     }
    //   }
    // }

    stage('Install Docker') {
      steps {
        script {
          // Instalação do Docker no ambiente do Jenkins
          sh 'sudo yum update -y'
          sh 'sudo yum install -y docker'
          sh 'sudo service docker start'
        }
      }
    }

    stage('Load Build Number') {
      steps {
        script {
          if (fileExists(BUILD_NUMBER_FILE)) {
            currentBuildNumber = readFile(BUILD_NUMBER_FILE).toInteger()
            currentBuildNumber++
            } else {
              currentBuildNumber = 1
            }
              writeFile file: BUILD_NUMBER_FILE, text: currentBuildNumber.toString()
        }
      }
    }

    stage('Build and Push Docker Image') {
      steps {
        script {
          def dockerImageTag = "${REGISTRY}:v${currentBuildNumber}"
          sh "docker build -t $dockerImageTag ."
          sh "docker push $dockerImageTag"
        }
      }
    }

    stage('Remove Docker on EC2 FrontEnd') {
      steps {
        script {
          sh "ssh -i /home/jenkins/key-picme-project.pem ubuntu@$EC2_INSTANCE_IP '$DOCKER_RM_SCRIPT'"
        }
      }
    }

    stage('deploy Docker Container on EC2 FrontEnd') {
      steps {
        script {
          sh "sudo docker run -d -p 3000:3000 --name picme_site $REGISTRY"
        }
      }
    }
  }

}