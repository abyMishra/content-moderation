import os
import uuid

names = []
path = './images/'

# normalize and rename images
for dirname, dirnames, filenames in os.walk(path):
    if dirname is '':
        continue

    for f in filenames:
        # remove gifs
        if (f.endswith('gif')):
          os.remove(f)

        # generate random name
        new_f = str(uuid.uuid4().hex)
        while new_f in names:
            new_f = str(uuid.uuid4().hex)
        names.append(new_f)
        new_f += '.jpg'

        # rename file
        old_path = dirname + '/'
        os.rename(old_path + f, old_path + new_f)

