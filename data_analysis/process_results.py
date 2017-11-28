import argparse
import pandas as pd

def main():
    parser = argparse.ArgumentParser(description='Preprocess and clean MTurk TSV data file.')

    # require data filepath
    parser.add_argument('--mturk', required='True', nargs=1,
                        action='store', type=str, dest='mturk_tsv_path',
                        help='MTurk results TSV filepath')
    parser.add_argument('--experiment', required='True', nargs=1,
                        action='store', type=str, dest='experiment_number',
                        help='Experiment number associated with the data file')

    # parse args into variables
    args = vars(parser.parse_args())
    mturk_tsv_path = args['mturk_tsv_path'][0]
    experiment_number = args['experiment_number'][0]

    # read file into dataframe, select data, and preprocess
    mturk_df = pd.read_csv(mturk_tsv_path, delimiter='\t')
    processed_df = pd.DataFrame(columns=['labels', 'clicks_total', 'mousemoves_total', 'completion_time', 'survey'])

    for row in mturk_df.itertuples():
        labels = str(getattr(row, '_32'))

        if labels == 'nan':
            continue

        # process data
        labels = labels.split('|')[0].strip()
        survey = str(getattr(row, '_30')).split('|')[0].strip()
        clicks_total = str(getattr(row, '_35')).split('|')[0].strip()
        mousemoves_total = str(getattr(row, '_41')).split('|')[0].strip()
        completion_time = str(getattr(row, '_42')).split('|')[0].strip()

        # save to new dataframe
        data = {
            'labels': labels,
            'survey': survey,
            'clicks_total': clicks_total,
            'mousemoves_total': mousemoves_total,
            'completion_time': completion_time
        }
        processed_df = processed_df.append(data, ignore_index=True)

    # save processed data to filesystem
    processed_df.to_csv('./data_files/mturk/moderation' + experiment_number + '.csv', index=False)

if __name__ == '__main__':
    main()

