import json

from random import sample, shuffle

# get file names and labels
with open('true_labels.json') as handle:
    dataset = json.load(handle)

# bin images by category
pornography = []
violence = []
sfw = []

for name, label in dataset.items():
    category = label['category']
    name = name[:-4]

    if category == 'pornography':
        pornography.append(name)
    elif category == 'violence':
        violence.append(name)
    else:
        sfw.append(name)

# shuffle images
for i in range(3):
    shuffle(pornography)
    shuffle(violence)
    shuffle(sfw)

# violence/pornography split
violence_split = 175
pornography_split = 125

# subset size and n/sfw split
sfw_split = 200

 # randomly sample from image categories
subset = []

subset += sample(pornography, pornography_split)
subset += sample(violence, violence_split)
subset += sample(sfw, sfw_split)

# shuffle subset and splt into groups of 10
for i in range(5):
    shuffle(subset)

subset = [','.join(subset[i:i + 10]) \
         for i in range(0, len(subset), 10)]

# save subset to text file
with open('subsets.txt', 'w') as handle:
    handle.write('\n'.join(subset))

