pipeline {
  agent any

  environment {
    REGISTRY = 'picmeproject/picme_site'
    EC2_INSTANCE_IP = '10.0.0.50'
    DOCKER_RM_IMAGES = 'docker rmi -f $(docker images -aq)'
    DOCKER_RM_CONTAINERS = 'docker rm $(docker ps -aq)'
    DOCKER_RUN = 'docker run -d -p 3000:3000 --name picme_site picmeproject/picme_site'
  }

  stages {
    stage('Login Docker Hub') {
      steps {
        script {
          withCredentials([string(credentialsId: 'dockerpwd', variable: 'dockerpwd')]) {
            sh "docker login -u picmeproject -p ${dockerpwd}"
          }
        }
      }
    }

    stage('Build and Push Docker Image') {
      steps {
        script {
          sh "docker build -t $REGISTRY ."
          sh "docker push $REGISTRY"
        }
      }
    }

    stage('Remove images before push') {
      steps {
        script {
          sh "$DOCKER_RM_IMAGES"
        }
      }
    }

    stage('Remove Docker on EC2 FrontEnd') {
      steps {
        script {

          withCredentials([sshUserPrivateKey(credentialsId: '10.0.0.50', keyFileVariable: 'key-picme-project.pem')]) {
            sh "ssh -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP '$DOCKER_RM_CONTAINERS'"
            sh "ssh -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP '$DOCKER_RM_IMAGES'"
          }
          // withCredentials([file(credentialsId: 'chave-aws', variable: 'key-picme-project.pem')]) {
          //   sh "cp \$key-picme-project.pem ~/.ssh/key-picme-project.pem"
          //   sh "chmod 600 ~/.ssh/key-picme-project.pem"
          // }
        }
      }
    }

    stage('Run image on FrontEnd') {
      steps {
        script {
          withCredentials([file(credentialsId: 'chave-aws', variable: 'key-picme-project.pem')]) {
            sh "ssh -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP '$DOCKER_RUN'"
          }
        }
      }
    }
  }
}