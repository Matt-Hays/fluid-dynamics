# Industrial Pump Parameter Calculator

Welcome to the **Industrial Pump Parameter Calculator**, a web-based tool designed to aid in the selection and design of
industrial pumps. This application calculates various parameters such as **Total Dynamic Head (TDH)**, **Net Positive
Suction Head Available (NPSHa)**, **minimum submergence requirements**, and more. By entering your pipeline and pump
system data, you can quickly visualize and gauge the expected system performance for different flow rates.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How to Use](#how-to-use)
- [Creating an Issue (Feature Requests, Questions, Bug Reports)](#creating-an-issue)
- [What Happens After You Create an Issue](#what-happens-after-you-create-an-issue)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

**Deployed Application:** [matt-hays.github.io/fluid-dynamics](https://matt-hays.github.io/fluid-dynamics)  
**Technology Stack:** Vue 3, TypeScript, Chart.js

This tool is particularly useful for **engineers and pump specialists** seeking a quick way to approximate or visualize
the performance requirements of their pumping systems. By inputting your system parameters (**pressures, elevations,
flow rates, pipeline roughness, etc.**), the application calculates an expected total head curve.

---

## Features

- **Real-time Chart Rendering** – View the **TDH vs. flow rate** in real-time using Chart.js.
- **Multiple Pipeline Sections** – Define as many pipeline sections as needed, each with its own **roughness, diameter,
  and minor loss factors (k-values)**.
- **Metric or Imperial Units** – Choose between **metric** and **imperial** units for flow rate, elevations, and
  pressures.
- **Daylighted End** – Account for **velocity head at the pipeline discharge** (open to atmosphere) if your system end
  is daylighted.
- **Data Validation** – Basic validations ensure your input values are **sensible** before generating the curves.

---

## How to Use

### 1. Open the Application

Navigate to [matt-hays.github.io/fluid-dynamics](https://matt-hays.github.io/fluid-dynamics). You will see a header link
labeled **“System Curves.”**

### 2. Fill Out Pipeline Information

- **Inlet/Discharge Flow Rate** – Enter flow rates for your system’s inlet and outlet.
- **Inlet/Discharge Pressure** – If you have measured or specified pressures at the system boundaries, enter them here.
- **Elevations** – Specify minimum/maximum elevations at the start and end.
- **Kinematic Viscosity** – Provide a representative value for your fluid.
- **End Daylighted** – Check this box if your pipeline outlet is open to atmosphere (i.e., draining freely).
- **Metric Units** – Check this box if your values are in metric (m, kPa, etc.).

### 3. Add Pipeline Sections

Each section can have unique properties:

- **Absolute Roughness** (pipe material surface roughness)
- **Section Length**
- **Diameter**
- **Material**
- **k-Values** (minor loss coefficients for fittings, bends, valves, etc.)

Click **“Add Section”** if your pipeline has multiple segments. You can also remove a section if it is not needed.

### 4. Submit Pipeline Data

After entering all the details, click **“Submit Pipeline Data.”**  
The chart on top will update to show:

- **TDH Max** – The total dynamic head considering the **highest possible static head**.
- **TDH Min** – The total dynamic head considering the **lowest possible static head**.

That’s it! You can now observe how your pipeline’s **TDH changes with flow rate**, which helps in **pump selection and
system design**.

---

## Creating an Issue

If you have a **feature request**, a **question**, or have encountered a **bug**, you can let the development team know
by creating a **GitHub issue**.

> **Note:** If you are new to GitHub, think of an **“issue”** as a way to ask a question or request something. You do
> not need to understand code to create an issue.

### Steps:

1. **Go to the Repository on GitHub**  
   Navigate to the repository:  
   👉 [GitHub Repo](https://github.com/matt-hays/fluid-dynamics) _(adjust if the repository name is different)._
2. **Click on the “Issues” Tab**  
   At the top of the repository page, click **“Issues.”**
3. **Press the “New Issue” Button**  
   On the Issues page, find and click the green **“New Issue”** button.
4. **Add a Title and Description**
    - **Title:** Briefly summarize your request or problem (e.g., _"Add NPSHa Calculation"_ or _"Bug: Pressure Units Not
      Converting Correctly"_).
    - **Description:** Provide more details. If it is a feature request, explain what you’d like to see. If it’s a bug,
      describe what happened (e.g., _"I entered a negative flow rate and it crashed."_).
5. **Submit Your Issue**  
   Click **“Submit new issue.”**

---

## What Happens After You Create an Issue

The **development team** will review your issue and decide on the next steps:

- ✅ **Accept** – They might plan to work on it immediately or add it to a future milestone.
- ❓ **Request More Information** – They may ask for additional details.
- ❌ **Close** – They may close the issue if it’s a duplicate, not feasible, or out of scope.

> **Note:** Creating an issue does **not guarantee** implementation. The project owner will decide based on **project
goals and priorities**.

---

## How to Contribute

We welcome community involvement and improvements to this project! Here is the standard process to submit your
contributions:

### 1. Fork the Repository

Click the **Fork** button at the top-right corner of the repository page. This creates your own copy of the project
under your GitHub account.

### 2. Clone Your Fork

On your computer, open a terminal/command prompt and run:

```bash
git clone https://github.com/<your-username>/fluid-dynamics.git
```

Replace `<your-username>` with your actual GitHub username.

### 3. Create a New Branch

Navigate into the project folder and create a new branch for your changes:

```bash
git checkout -b feature/new-awesome-feature
```

### 4. Make Your Changes

- Add or modify the code or documentation as needed.
- Test your changes locally to ensure everything works properly.

### 5. Commit and Push

Stage and commit your changes:

- *Commits should be named using past-tense action verbs.*

```bash
git add .
git commit -m "Added new awesome feature"
```

Push your branch to GitHub:

```bash
git push origin feature/new-awesome-feature
```

### 6. Open a Pull Request (PR)

- Go to your fork on GitHub and click the **"Compare & pull request"** button.
- Provide a clear description of what your PR does and why it should be merged.

### 7. Code Review & Acceptance

- Your **Pull Request** will be reviewed by the project maintainers.
- They may request changes, ask for clarification, or approve your work.
- Once approved, a maintainer will merge your PR into the main project.

> **Note:** All contributions go through a **review process** before being accepted. This ensures **quality,
consistency, and alignment** with project goals.

Thank you for contributing! 🚀

---

## Project Structure

Here’s a brief overview of how the application is organized:

```text
.
├── public/                 # Public assets
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ChartComponent.vue       # Renders the chart using Chart.js
│   │   └── PipelineFormComponent.vue # Data entry form for pipeline info
│   ├── models/
│   │   ├── Pipeline.ts              # Holds pipeline-level data
│   │   ├── Section.ts               # Defines a single pipeline section
│   │   └── bernoulli.ts             # Various fluid flow calculations
│   ├── router/
│   │   └── index.ts                 # Vue Router setup
│   ├── views/
│   │   └── CurveView.vue            # Main page that renders the chart and form
│   ├── viewmodels/
│   │   ├── ChartViewModel.ts        # Logic for Chart.js configuration
│   │   └── CurveViewModel.ts        # Orchestrates data input & chart updates
│   ├── App.vue                      # Root component
│   └── main.ts                      # Entry point
├── package.json
├── README.md                        # Project README (you're reading this!)
└── ...
```

### Key Files:

- **`CurveView.vue`** – Main view that includes the chart and form, and handles user submissions.
- **`ChartComponent.vue`** – Renders the scatter plot for TDH vs. flow rate.
- **`PipelineFormComponent.vue`** – A form for entering pipeline sections, flow rates, elevations, etc.
- **`ChartViewModel.ts`** – Initializes and updates Chart.js with real-time data.
- **`CurveViewModel.ts`** – Coordinates user input from the form, performs calculations, and updates chart data.
- **`Pipeline.ts` / `Section.ts`** – Defines data models for your piping system.
- **`bernoulli.ts`** – Implements fluid flow equations, friction factor calculations, and Bernoulli-based computations.

---

## License

This project is distributed under the **MIT License**. You are **free to use, modify, and distribute** this software. If
you find it useful, please consider contributing new features or reporting any issues.

---

Thank you for using the **Industrial Pump Parameter Calculator**! Your feedback and ideas are valuable. Feel free to
**create an issue** with any questions or suggestions. 🚀
