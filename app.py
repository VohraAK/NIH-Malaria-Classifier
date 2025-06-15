import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from model import IMG_SIZE, class_indices
import tensorflow.keras as tfk
import tensorflow.keras.layers as tfkl

app = FastAPI()

model = tfk.models.load_model("malaria_classifier.keras")
# print(model.summary())

@app.get("/")
async def root():
    return {"message": "API is running ✅"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # get bytes
        img_contents = await file.read()
        
        img = tfk.utils.load_img(io.BytesIO(img_contents), color_mode="rgb", target_size=(IMG_SIZE, IMG_SIZE))
        img_arr = np.array([img])
    
        # get preds
        preds = model.predict(img_arr).round().astype(int)
        pred = preds[0, 0]
        
        print(f"IMAGE PRED: {preds}")
        
        return JSONResponse(status_code=200, content={
            "class_index": str(pred),
            "class": str(class_indices[pred])
        })
        
    except Exception as e:
        return JSONResponse(status_code=500, content={"Error": str(e)})