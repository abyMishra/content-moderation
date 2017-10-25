import json
import os
import uuid

labels = {}
names = []
path = './images/'

# normalize and rename images, generate truth labels
for dirname, dirnames, filenames in os.walk(path):
    if dirname is '':
        continue

    for f in filenames:
        # remove gifs
        if (f.endswith('gif')):
          os.remove(f)

        # generate random string
        new_f = str(uuid.uuid4().hex)
        while new_f in names:
            new_f = str(uuid.uuid4().hex)
        names.append(new_f)
        new_f += '.jpg'

        # rename file
        old_path = dirname + '/'
        os.rename(old_path + f, old_path + new_f)

        # generate truth label
        label_name = dirname.strip(path)
        image_category, image_type = label_name.split('_')
        labels[new_f] = {
            'category': image_category,
            'type': image_type,
            'label_type': label_name
        }

# save labels to json
with open('true_labels.json', 'w') as handle:
    json.dump(labels, handle)

