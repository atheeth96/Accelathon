# import the necessary packages
from keras.applications import ResNet50
from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
from flask_cors import CORS
from PIL import Image
import numpy as np
import flask
import io
import numpy as np
import keras.models
from keras.models import model_from_json
import tensorflow as tf
import os
import response
import keras
from keras.metrics import top_k_categorical_accuracy

def inTop2(x,y):
  return top_k_categorical_accuracy(x,y,2)

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
CORS(app)
model = None
graph = None


def load_model():
    # json_file = open('./model/model.json', 'r')
    # loaded_model_json = json_file.read()
    # json_file.close()
    # loaded_model = model_from_json(loaded_model_json)
    # #load woeights into new model
    # loaded_model.load_weights("./model/model.h5")
    loaded_model = keras.models.load_model('./model/model.h5', custom_objects={'inTop2':inTop2})
    print("Loaded Model from disk")
    global graph
    graph = tf.get_default_graph()
    global model
    model = loaded_model
    print(model.summary)


def prepare_image(image, target):
    # if the image mode is not RGB, convert it
    if image.mode != "RGB":
        image = image.convert("RGB")

    # resize the input image and preprocess it
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = imagenet_utils.preprocess_input(image)

    # return the processed image
    return image


@app.route("/predict", methods=["POST"])
def predict():
    # initialize the data dictionary that will be returned from the
    # view
    data = {"success": False}

    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        if flask.request.files.get("image"):
            # read the image in PIL format
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image))

            # preprocess the image and prepare it for classification
            image = prepare_image(image, target=(512, 512))

            # classify the input image and then initialize the list
            # of predictions to return to the client
            model.summary()
            with graph.as_default():
                preds = model.predict(image)
            # results = imagenet_utils.decode_predictions(preds)
            results = np.argmax(preds)
            # import ipdb; ipdb.set_trace()
            data = {"results" : str(results)}

    # return the data dictionary as a JSON response
    return flask.jsonify(data)


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
        "please wait until server has fully started"))
    load_model()
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
