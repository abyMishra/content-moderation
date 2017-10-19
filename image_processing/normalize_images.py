import json
import os
import shutil

labels = {}
count = 1000

try:
  shutil.rmtree('images')
except:
  pass

os.mkdir('images')

for dirname, dirnames, filenames in os.walk('.'):
    dirname = dirname[2:]
    og_dirname = dirname

    if 'images' in dirname or dirname is '':
        continue

    if dirname[-1:].isdigit():
        dirname = dirname[:-1]

    os.mkdir('images/' + dirname)

    for f in filenames:
        if (f.endswith('gif')):
          os.remove(f)

        new_f = str(count) + '.jpg'
        count += 1

        os.rename(og_dirname + '/' + f,
                  'images/' + dirname + '/' + new_f)

        image_label, image_type = dirname.split('_')
        labels[new_f] = {
            'label': image_label,
            'type': image_type,
            'label_type': dirname
        }

    os.removedirs(og_dirname)

with open('true_labels.json', 'w') as handle:
    json.dump(labels, handle)

