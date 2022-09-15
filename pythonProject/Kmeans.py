import pandas as pd
from pandas import unique
from sklearn.cluster import k_means_, KMeans
import matplotlib.pyplot as plt
import numpy as np
data = pd.read_csv(r'C:\Users\LENOVO\Downloads\songs_normalize.csv')
data=data.head(40)
x=data['duration_ms']
y=data['popularity']
z=data['genre']
d=(data.groupby(['genre']).size())
print(unique(z))
print(d)

data = list(zip(x, y))
kmeans = KMeans(n_clusters=len(d))
kmeans.fit(data)
print(kmeans.labels_)
print(x)
j=unique(z)
for i in range(0,len(j)):
    plt.scatter(x[i],y[i],label=j[i])
plt.xlabel('duration is ms')
plt.ylabel('popularity')
plt.scatter(x, y, c=kmeans.labels_)
plt.legend()
plt.show()

