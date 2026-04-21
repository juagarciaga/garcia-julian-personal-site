#!/bin/bash
# Build CV PDF and copy to public folder
cd "$(dirname "$0")"
pdflatex cv_garcia.tex
cp cv_garcia.pdf ../public/cv_garcia.pdf
echo "CV built and copied to public/cv_garcia.pdf"
