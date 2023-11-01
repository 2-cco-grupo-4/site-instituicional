pipeline {
    agent 3

    environment {
        DOCKER_IMAGE_NAME = 'picmeproject/picme_site'
        EC2_INSTANCE_IP = '34.228.14.4'
        DOCKER_USERNAME = 'picmeproject'
        DOCKER_PASSWORD = 'Ventania12#'
    }

    stages {
        stage('Docker Login') {
            steps {
                script {
                    sh "sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh "sudo docker build -t $DOCKER_IMAGE_NAME ."
                    sh "sudo docker push $DOCKER_IMAGE_NAME"
                }
            }
        }

        stage('Remove Docker on EC2 FrontEnd') {
            steps {
                script {
                    sh "ssh -i /home/jenkins/key-picme-project.pem ubuntu@$EC2_INSTANCE_IP 'sudo docker rm -f $(docker ps -a)'"
                }
            }
        }

        stage('deploy Docker Container on EC2 FrontEnd') {
            steps {
                script {
                      sh "sudo docker run -d -p 3000:3000 --name picme_site $DOCKER_IMAGE_NAME"
                }
            }
        }
    }
}