import json
import os

labels = {}
counts = {}
path = './images/'

# recurse through directories in path
for dirname, dirnames, filenames in os.walk(path):
    if dirname is '' or dirname is path:
        continue

    label_name = dirname[len(path):]
    image_category, image_type = label_name.rsplit('_', 1)
    counts[label_name] = len(filenames)

    for f in filenames:
        # generate truth label
        labels[f] = {
            'category': image_category,
            'type': image_type,
            'label_type': label_name
        }

# print dataset category counts
print('Dataset category distribution:')
for category, count in counts.items():
    print('{}\t\t{}'.format(category, count))

# save labels to json
with open('labels.json', 'w') as handle:
    json.dump(labels, handle, sort_keys=True,
              indent=4, separators=(',',': '))

