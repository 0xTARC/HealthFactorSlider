import { Label } from '@radix-ui/react-label';
import * as RadixSlider from '@radix-ui/react-slider';
import { styled, VariantProps } from '@stitches/react';
import { ReactNode } from 'react';

const RadixSliderRoot = styled(RadixSlider.Root, {
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  '&[data-orientation="horizontal"]': { height: '20px' },
  '&[data-disabled]': { cursor: 'not-allowed' },
});

const RadixSliderLabels = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.25rem',
  // extend labels slightly past edges of slider
  width: 'calc(100% + 0.75rem)',
  // center labels on track
  marginLeft: 'calc(0.375rem * -1)',
});

const RadixSliderTrack = styled(RadixSlider.Track, {
  position: 'relative',
  backgroundColor: 'white',
  flexGrow: '1',
  height: '100%',
  borderRadius: '4px',
  '&[data-orientation="horizontal"]': { height: '0.375rem' },
  '&[data-disabled]': { opacity: 0.5 },

  variants: {
    color: {
      gradient: {
        backgroundImage:
          'linear-gradient(90deg, red 0%, yellow 50%, green 100%)',
        '&[data-inverted]': {
          backgroundImage:
            'linear-gradient(90deg, green 0%, yellow 50%, red 100%)',
        },
      },
    },
  },
});

const RadixSliderRange = styled(RadixSlider.Range, {
  position: 'absolute',
  borderRadius: '9999px',
  height: '100%',
});

const RadixSliderThumb = styled(RadixSlider.Thumb, {
  display: 'block',
  width: '1.25rem',
  height: '1.25rem',
  backgroundColor: 'white',
  borderRadius: '100%',
  boxShadow: '0 0 0 2px gray',

  '&:hover': {
    backgroundColor: 'white',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px black',
  },
  '&[data-disabled]': { background: 'black' },
});

interface BaseSliderProps extends RadixSlider.SliderProps {
  // Override `color` type from RadixSlider.SliderProps to `any`
  color?: any;
  maxLabel?: ReactNode;
  middleLabel?: ReactNode;
  minLabel?: ReactNode;
  // Limit Slider orientation to horizontal only
  orientation?: 'horizontal';
}

interface SliderProps extends BaseSliderProps {
  // Narrow `color` type to only allow the specific variants in RadixSliderTrack
  // This allows autocomplete engines to suggest your color variants when using the Slider component's `color` prop
  color?: VariantProps<typeof RadixSliderTrack>['color'];
}

export const Slider = (props: SliderProps) => {
  const {
    'aria-label': ariaLabel,
    color,
    disabled,
    inverted,
    max,
    maxLabel,
    middleLabel,
    min,
    minLabel,
    onValueChange,
    step,
    value,
  } = props;

  return (
    <>
      <RadixSliderLabels>
        <Label>{inverted ? maxLabel : minLabel}</Label>
        <Label>{middleLabel}</Label>
        <Label>{inverted ? minLabel : maxLabel}</Label>
      </RadixSliderLabels>

      <RadixSliderRoot
        aria-label={ariaLabel}
        disabled={disabled}
        inverted={inverted}
        max={max}
        min={min}
        onValueChange={onValueChange}
        step={step}
        value={value}
      >
        <RadixSliderTrack data-inverted={inverted} color={color}>
          <RadixSliderRange />
        </RadixSliderTrack>
        <RadixSliderThumb />
      </RadixSliderRoot>
    </>
  );
};
