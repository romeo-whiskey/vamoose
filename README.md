# vamoose
Vamoose enables inputs to be cleared via the keyboard, with a11y in mind.

## Installation
```html
<script src="path/to/js/vamoose.js" type="text/javascript"></script>
<link href="path/to/css/vamoose.css" rel="stylesheet" type="text/css" />
```

## Usage
```javascript
document.addEventListener('DOMContentLoaded', function(){
    vamoose('input, textarea', options);
}, false);
```

### Options

| Parameter          | Type    | Default | Description                                                                    |
| ------------------ | ------- | ------- | ------------------------------------------------------------------------------ |
| hideOnBlur         | boolean | true    | Hides the clear CTA when the input looses focus                                |
| useParentAsWrapper | boolean | false   | Use existing parent element as wrapper, instead of wrapping with a new element |
| showOn             | string  | focus   | What triggers CTA visibilty. Valid options are `focus, input`                  |


## License
See [LICENSE.md](LICENSE.md)
