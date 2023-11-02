pipeline {
  agent any

  environment {
    REGISTRY = 'picmeproject/picme_site'
    EC2_INSTANCE_IP = '34.228.14.4'
    DOCKER_USERNAME = 'picmeproject'
    DOCKER_PASSWORD = 'Ventania12#'
    DOCKER_RM_SCRIPT = 'sudo docker rm -f $(docker ps -aq)'
    BUILD_NUMBER_FILE = 'build_number.txt'
    DOCKER_IMAGE = ''
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

    stage('Build and Push Docker Image') {
      steps {
        script {
          DOCKER_IMAGE = docker.build REGISTRY + ":$BUILD_NUMBER"
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