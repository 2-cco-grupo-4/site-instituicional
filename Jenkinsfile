pipeline {
  agent any

  environment {
    REGISTRY = 'picmeproject/picme_site'
    EC2_INSTANCE_IP_FRONT1 = '10.0.0.50'
    EC2_INSTANCE_IP_FRONT2 = '10.0.0.156'
    DOCKER_RM_IMAGES = 'docker rmi -f $(docker images -aq)'
    DOCKER_RM_CONTAINERS = 'docker rm -f $(docker ps -aq)'
    DOCKER_RUN = 'docker run -d -p 3000:3000 --name picme_site picmeproject/picme_site'
  }

  stages {

    stage('Check if triggered by merge') {
      when {
        expression { currentBuild.changeSets.size() == 1 && currentBuild.changeSets[0].kind == 'Merged' }
      }
      steps {
        echo 'Pipeline triggered by merge, skipping other stages.'
      }
    }

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

    stage('Remove Docker on EC2 FrontEnd 01') {
      steps {
        script {
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT1 '$DOCKER_RM_CONTAINERS'"
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT1 '$DOCKER_RM_IMAGES'"   
        }
      }
    }

    stage('Run image on FrontEnd 01') {
      steps {
        script {
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT1 '$DOCKER_RUN'"
        }
      }
    }

    stage('Remove Docker on EC2 FrontEnd 02') {
      steps {
        script {
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT2 '$DOCKER_RM_CONTAINERS'"
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT2 '$DOCKER_RM_IMAGES'"   
        }
      }
    }

    stage('Run image on FrontEnd 02') {
      steps {
        script {
          sh "ssh -o StrictHostKeyChecking=no -i key-picme-project.pem ubuntu@$EC2_INSTANCE_IP_FRONT2 '$DOCKER_RUN'"
        }
      }
    }
  }
}