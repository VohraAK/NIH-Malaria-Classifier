import tensorflow as tf
import tensorflow.keras as tfk
import tensorflow.keras.layers as tfkl
from tensorflow.keras.regularizers import l2

IMG_SIZE = 150

model = tfk.Sequential([
    tfkl.Conv2D(32, kernel_size=3, strides=1, kernel_regularizer=l2(0.0001), input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    tfkl.BatchNormalization(),
    tfkl.ReLU(),
    tfkl.MaxPool2D(),
    tfkl.Conv2D(128, kernel_size=3, strides=1, kernel_regularizer=l2(0.0001)),
    tfkl.BatchNormalization(),
    tfkl.ReLU(),
    tfkl.MaxPool2D(),
    tfkl.Conv2D(256, kernel_size=3, strides=1),
    tfkl.BatchNormalization(),
    tfkl.ReLU(),
    tfkl.MaxPool2D(),
    tfkl.Flatten(),
    tfkl.Dense(128),
    tfkl.BatchNormalization(),
    tfkl.ReLU(),
    tfkl.Dropout(0.5),
    tfkl.Dense(256),
    tfkl.BatchNormalization(),
    tfkl.ReLU(),
    tfkl.Dense(1, activation="sigmoid")
])