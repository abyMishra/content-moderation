import json

from random import shuffle

# get file names and labels
with open('labels.json') as handle:
    dataset = json.load(handle)

# bin images by category
sex_nudity = []
graphic = []
safe = []

for name, label in dataset.items():
    category = label['category']

    if category == 'sex_nudity':
        sex_nudity.append(name)
    elif category == 'graphic':
        graphic.append(name)
    else:
        safe.append(name)

# shuffle images
shuffle(sex_nudity)
shuffle(graphic)
shuffle(safe)

# add 3 images from each category to a subset
subsets = []
for i in range(0, 180, 3):
    subsets.append([sex_nudity[i], sex_nudity[i + 1], sex_nudity[i + 2], \
                    graphic[i],    graphic[i + 1],    graphic[i + 2],    \
                    safe[i],       safe[i + 1],       safe[i + 2]        ])

# shuffle subsets
shuffle(subsets)
for i in range(0, len(subsets)):
    subset = subsets[i]
    shuffle(subset)
    subsets[i] = (',').join(subset)

# save subset to text file
with open('subsets.txt', 'w') as handle:
    handle.write('\n'.join(subsets))

