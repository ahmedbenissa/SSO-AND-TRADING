import pandas as pd
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
data = pd.read_csv(r'C:\Users\LENOVO\Downloads\game_goalie_stats.csv')
data=data.head(21)
d= {"W":2 , "L":0,"":1}
data["decision"]=data["decision"].map(d)
features = ['timeOnIce', 'savePercentage']
X = data[features]
Y = data["decision"]
print(X)
print(Y)
dtree= DecisionTreeClassifier()
dtree=dtree.fit(X,Y)
print(dtree.predict([[3903,85.7]]))
