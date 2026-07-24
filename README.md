# Mathematics professor site — proof of concept

A lightweight academic homepage designed for GitHub Pages. It uses plain HTML,
CSS, and JavaScript, so there is no build step or dependency to maintain.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Gist integration

The Notes section loads the three most recently updated public gists for
`hhuang235` using GitHub's public API. No token or server is needed. If there are
no public gists, the page shows a link for creating the first one.

## Publish later

Once the content is approved, this folder can be pushed to a GitHub repository
and published from the repository root with GitHub Pages.
