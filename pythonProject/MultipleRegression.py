import pandas as pd
from sklearn import linear_model
import matplotlib.pyplot as plt
data = pd.read_csv('D:\Cars.csv')
print(data)
X=data[["Volume","Weight"]]
Y=data["CO2"]
r=linear_model.LinearRegression().fit(X,Y)
x1=[1001,2800,2888,3001,3002]
prediction = r.predict([[1001,700],[2800,1850],[2888,500],[3001,800],[3002,1825]])

#plt.plot(x1,prediction)
#plt.show()
print(prediction)



