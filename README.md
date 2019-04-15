# README


Step1 - Use command docker-compose up -d --build to BUILD the file

Step2 - Use command docker-compose execute web bash to run flask

Step3 - Use command python run_keras_server.py

Step4 - Use POSTMAN to test backend API (RESTful) at http://localhost:5001/predict
        This would return a result JSON which gives a range of aneurysm on a scale of 0-4
        (NOTE: sample images provided, it should be given in body params with {"image":file}
        
Step5 - Use localhost 3000 to run react app.

Use UI to navigate and get results
