import { useState, useEffect, useCallback, SyntheticEvent } from 'react';

import axios from 'axios';

export type UseUploaderInputType = {
  /**
   * custom error message
   * if not provided, will use default message
   */
  errorMessage?: string;

  /**
   * custom loading message
   * if not provided, will use default message
   */
  loadingMessage?: string;

  // size in BYTES
  // 15mb is = 15728640
  // our default is = 10,485,760 (10mb)
  maxSize?: number;

  /**
   * not required
   * side effect:
   * the idea of this side effect is to do something with your image
   * elsewhere if needed
   */
  onUploadComplete?: (image: GalleryImageType) => void;

  /**
   * Optional
   * on upload complete.
   * usually given to visual components
   */
  successMessage?: string;
};

export type UseUploaderReturnType = {
  error: boolean;
  assistiveText: string;
  loadingImage: string;
  upload: (e: SyntheticEvent<HTMLInputElement>) => void;
  loading: boolean;
  loadingText?: string;
};

type LocalImageType = {
  base64: string;
  name: string;
  size: number;
  file?: any;
};

export const useUploader = ({
  errorMessage = 'an error occured',
  loadingMessage = 'Loading...',
  maxSize = 10485760,
  onUploadComplete,
}: UseUploaderInputType): UseUploaderReturnType => {
  const [localImage, setLocalImage] = useState<LocalImageType | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [assistiveText, setAssistiveText] = useState(errorMessage);

  const [suppressErrors, setSuppressErrors] = useState(true);

  const showErrors = useCallback(() => {
    if (suppressErrors) {
      setSuppressErrors(false);
    }
  }, [suppressErrors]);

  useEffect(() => {
    // this is the upload routine
    // its a useEffect watching the local image, so when it changes
    // if we have one, lets upload
    if (localImage && localImage.file) {
      // we only use 'file' here because
      // on the server we will verify it.
      // and then generate a base64z
      // cant trust the client.
      const body = new FormData();
      body.append('image', localImage.file);

      axios
        .post('/images', body)
        .then(res => {
          switch (res.status) {
            case 200:
              return res.data;
            default:
              new Error('Something went wrong, please try again.');
          }
        })
        .then(data => {
          setTimeout(() => {
            setLocalImage(null);
            setLoading(false);
            setError(false);
            if (onUploadComplete) onUploadComplete(data);
          }, 1000);
        })
        .catch(err => {
          let message = err;
          if (err.response) {
            const status = err.response.status;
            switch (status) {
              case 406:
                message = 'Filetype Not Supported';
                break;
              case 500:
                message = 'Internal Server Error';
                break;
              case 400:
                message = 'Upload Rejected';
                break;
              default:
                message = 'Something went wrong, please try again.';
            }
          }
          setLocalImage(null);
          setLoading(false);
          showErrors();
          setError(true);
          setAssistiveText(message);
        });
    }
  }, [localImage?.size, localImage?.base64, onUploadComplete, showErrors]);

  return {
    loadingImage: localImage?.base64 || '',
    error: Boolean(!suppressErrors && Boolean(error)),
    assistiveText,
    loading,
    loadingText: loadingMessage,
    // input event, for upload
    upload: (e: SyntheticEvent<HTMLInputElement>): void => {
      if (e.target) {
        // files is an array of, well, files
        //  this could support multi-selections!
        const files = (<HTMLInputElement>e.target).files;
        if (files) {
          const file = files[0];
          if (!file) {
            setError(true);
            setLocalImage(null);
            showErrors();
            setAssistiveText('You did not select an image.');
            return;
          } else if (file.size > maxSize) {
            setLoading(false);
            setError(true);
            setLocalImage(null);
            showErrors();
            setAssistiveText('The Image is too large.');
            return;
          } else {
            setLoading(true);
            // reader is only used for local image as base64 string
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onerror = () => {
              reader.abort();
              setLoading(false);
              showErrors();
              setLocalImage(null);
              setError(true);
              setAssistiveText('Something went wrong, please try again.');
              return;
            };

            reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
              if (!progressEvent.target?.result) return;
              // set state to local version below, display that in the dom until upload image gets a url back.
              // base64 image, can be rendered like a src or url('')

              const base64 = progressEvent.target.result as string; // captured
              setLocalImage({
                base64,
                size: file.size,
                name: file.name,
                file,
              });
            };
          }
        }
      }
    },
  };
};
