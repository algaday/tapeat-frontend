export type GeocodeResponse = {
  response: {
    GeoObjectCollection: {
      featureMember: FeatureMember[];

      metaDataProperty: {
        GeocoderResponseMetaData: {
          found: string;
          request: string;
          results: string;

          Point: {
            pos: string;
          };

          boundedBy: {
            Envelope: {
              lowerCorner: string;
              upperCorner: string;
            };
          };
        };
      };
    };
  };
};

export type SuggestApiResponse = {
  suggest_reqid: string;

  results: Suggestion[];
};

type FeatureMember = {
  GeoObject: {
    Point: {
      pos: string;
    };
    boundedBy: {
      Envelope: {
        lowerCorner: string;
        upperCorner: string;
      };
    };
    description: string;
    name: string;
    uri: string;

    metaDataProperty: {
      GeocoderMetaData: {
        text: string;
        precision: string;
        kind: string;
      };
    };
  };
};

export type Suggestion = {
  uri: string;
  tags: string[];

  title: {
    text: string;
  };

  subtitle: {
    text: string;
  };

  distance: {
    value: number;
    text: string;
  };
};
