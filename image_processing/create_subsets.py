import json

from random import sample, shuffle

# get file names and labels
with open('labels.json') as handle:
    dataset = json.load(handle)

# bin images by category
sex_nudity = []
graphic = []
safe = []

for name, label in dataset.items():
    category = label['category']
    name = name[:-4]

    if category == 'sex_nudity':
        sex_nudity.append(name)
    elif category == 'graphic':
        graphic.append(name)
    else:
        safe.append(name)

# shuffle images
for i in range(3):
    shuffle(sex_nudity)
    shuffle(graphic)
    shuffle(safe)

# graphic/sex_nudity split
graphic_split = 175
sex_nudity_split = 125

# subset size and safe split
safe_split = 200

 # randomly sample from image categories
subset = []

subset += sample(sex_nudity, sex_nudity_split)
subset += sample(graphic, graphic_split)
subset += sample(safe, safe_split)

# shuffle subset and splt into groups of 10
for i in range(5):
    shuffle(subset)

subset = [','.join(subset[i:i + 10]) \
         for i in range(0, len(subset), 10)]

# save subset to text file
with open('subsets.txt', 'w') as handle:
    handle.write('\n'.join(subset))

