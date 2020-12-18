# Research Design App

## Problem:
Science is advanced and accelerated through building on what's been done before, so knowing what's been done is critical. The phrase "standing on the shoulders of giants" is often used.

The organization and use of Research Information within an R&D organization is a large problem in the Biotech and the Pharmaceutical industry. With the ever-increasing generation of Genomics data (and other large scale data types) over the past 5-10 years, the scale of data alone is huge. At the same time, the sophistication of research analyses has also exponentially increased, and while there are Big Data Management Solutions, there currently exists no Big Research Management Solutions. Simply put, Scientists are often unable to find what research is happening within a large organization and what data is being analyzed, robbing them of fully unleashing the power of collective science (I made that term up.) Another way to put it is the inability to know what others have done is a hindrance of speed-to-insight. And the faster a scientist can understand a disease, the faster they can develop therapeutics to treat sick patients in need.

## Proposed Solution:
Research design as a concept refers to the overall strategy that a scientist uses to integrate the different components of a study in a coherent and logical way, with the goal to ensure they will effectively address a research problem. It is the blueprint for data analyses. I propose the creation of a Research Design Web App. It will be a web portal that allows scientists to construct, enter and connect their research plans into a simple user interface that others can find.

The tech stack is Python, Flask and React on top of a MongoDB.

Steps:
1. Define Goals
2. Design Studies
3. Plan Analyses
4. Publish Results

## User Stories
1. As a research scientist I want to define the goals of a research project
2. As a research scientist I want to design a study around one or more research goals
3. As a research scientist I want to plan one or more analyses for a given study
4. As a research scientist I want to publish one or more result for a given analysis

## Available Scripts
In the app directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.