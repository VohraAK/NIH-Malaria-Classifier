FROM python:3.10.18

WORKDIR /home/api

COPY requirements.txt /home/api/

RUN pip install -r requirements.txt

COPY malaria_classifier.keras /home/api/

COPY app.py /home/api/

COPY model.py /home/api/

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]