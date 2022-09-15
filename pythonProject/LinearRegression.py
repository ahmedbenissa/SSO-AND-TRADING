import pandas as pd
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy as np
data = pd.read_csv('D:\Cars.csv')
print(data)
X=data[["Volume"]]
Y=data["CO2"]
print("mean value Volume:",np.mean(X))
print('median value Volume',np.median(X))
#print ('percentage of volume under',1500,np.percentile(X,900))
r=linear_model.LinearRegression().fit(X,Y)
x1=[1001,2800,2888,3001,3002]
prediction = r.predict([[1001],[2800],[2888],[3001],[3002]])
plt.scatter(X,Y,color="red")
plt.plot(x1,prediction)
plt.show()
print(prediction)
