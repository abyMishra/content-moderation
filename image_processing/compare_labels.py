import csv
import json
import sys

all_labels = []
comparisons = []

# set this to true to include image names in the output
verbose = False

categories = {
    'safe_synthetic': 1,
    'safe_realistic': 2,
    'pornography_synthetic': 3,
    'pornography_realistic': 4,
    'violence_synthetic': 5,
    'violence_realistic': 6
}

# remove first argument (i.e., the name of this file)
sys.argv = sys.argv[1:len(sys.argv)]

# ensure at least two command line arguments have been passed
if len(sys.argv) < 2:
    raise Exception('Expected at least two arguments')

# ensure that all arguments are JSON filepahts
try:
    # open JSON files as dicts
    for filename in sys.argv:
        with open(filename) as handle:
            all_labels.append(json.load(handle))
except Exception as exception:
    print(exception)
    print('All arguments should be JSON filepaths')
    raise

# ensure all dicts are of the same size
first_labels = all_labels.pop(0)
size = len(first_labels)
for labels in all_labels:
    if len(labels) != size:
        raise Exception('Arguments are not of the same size')

# iterate through all labels and compare values
for image_name in first_labels.keys():
    try:
        label = first_labels[image_name]
        category = categories[label["label_type"]]

        comparison = []
        if verbose:
            comparison.append(image_name)
        comparison.append(category)

        for labels in all_labels:
            label = labels[image_name]
            category = categories[label["label_type"]]
            comparison.append(category)

        comparisons.append(comparison)
    except Exception as exception:
        print(exception)
        print('Encountered an unexpected key or value')
        raise

# save comparisons to csv
with open('comparisons.csv', 'w') as handle:
    writer = csv.writer(handle)
    writer.writerows(comparisons)

