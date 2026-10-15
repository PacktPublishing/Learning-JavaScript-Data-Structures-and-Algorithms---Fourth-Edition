# Learning JavaScript Data Structures and Algorithms

Book development — *Learning JavaScript Data Structures and Algorithms*, Packt Publishing.

## Install Jupyter and run the notebooks

A notebook (`.ipynb`) combines explanations, executable code cells, and their output. You open the file in Jupyter rather than installing the notebook itself.

These notebooks run **JavaScript**. Python runs Jupyter's interface, Node.js executes the examples, and the **IJavascript kernel** connects the two. All Chapter 4 examples are included in [the notebook](src/chapter4/chapter4_examples.ipynb); you do not need separate JavaScript or TypeScript source files.

### 1. Install the prerequisites

Install [Python 3](https://www.python.org/downloads/) and a [Node.js LTS release](https://nodejs.org/en/download/) (includes npm). If you already have them, skip their installation. Open a new terminal afterward.

Check that they are available:

```sh
python3 --version
node --version
npm --version
```

On Windows, use `py --version` instead of `python3 --version`. The chapter uses modern JavaScript features such as private fields, `Array.at()`, and `Object.hasOwn()`.

### 2. Install Jupyter in a virtual environment

Open a terminal in this project's root folder. On your Mac, that is:

```sh
cd "/Users/arismarko/Projects/Book-development---Learning-JavaScript-Data-Structures-and-Algorithms"
```

On another computer, substitute the location where you downloaded or cloned the project.

**macOS / Linux:**

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install jupyterlab notebook
```

If this project already has a working `.venv`, skip its creation and start with activation.

**Windows (Command Prompt):**

```bat
py -m venv .venv
.venv\Scripts\activate.bat
python -m pip install --upgrade pip
python -m pip install jupyterlab notebook
```

This installs both JupyterLab and the Jupyter Notebook interface. Either can open the same notebook files. The virtual environment keeps Python dependencies local to this project. These installation commands follow the [official Jupyter installation guide](https://jupyter.org/install).

### 3. Install the JavaScript kernel

Keep the virtual environment active and run:

```sh
npm install -g ijavascript
ijsinstall --spec-path=full --hide-undefined
jupyter kernelspec list
```

The list should include `javascript`. The npm command installs IJavascript; `ijsinstall` registers it with Jupyter for your user. Full paths help Jupyter find Node.js. If you later change your Node.js installation, rerun `ijsinstall --spec-path=full --hide-undefined`. See the [IJavascript installation guide](https://github.com/n-riesco/ijavascript/blob/master/doc/install.md) and [kernel options](https://github.com/n-riesco/ijavascript/blob/master/doc/usage.md).

### 4. Open Chapter 4 and run it

From the project root, with the virtual environment active:

```sh
jupyter lab src/chapter4/chapter4_examples.ipynb
```

Alternatively, use the Jupyter Notebook interface:

```sh
jupyter notebook src/chapter4/chapter4_examples.ipynb
```

Run one of these commands. Keep that terminal open while using Jupyter. If a browser does not open automatically, open the local URL printed in the terminal.

1. Select the **JavaScript (Node.js)** kernel; some installations label it **Javascript (Node.js)**.
2. If Jupyter reports that **`jsbook`** is missing, choose the installed JavaScript kernel. `jsbook` is the original author's local kernel name; you do not need that exact name. You can also change it through **Kernel → Change Kernel**.
3. Choose **Run → Run All Cells** to execute the notebook from top to bottom. To run one cell, select it and press **Shift+Enter**.
4. Look for **`All Chapter 4 checks passed.`** near the end.
5. Save the notebook to retain your outputs and kernel selection.

Run the `Stack` definition before cells that use it. After restarting a kernel, run all cells again to recreate the definitions. The supplied TypeScript examples have been adapted to executable JavaScript for this notebook.

### 5. Start it again later

You only need to install the dependencies once. On macOS / Linux, open a terminal in the project folder and run:

```sh
source .venv/bin/activate
jupyter lab src/chapter4/chapter4_examples.ipynb
```

On Windows Command Prompt, activate with `.venv\Scripts\activate.bat` instead. To stop Jupyter, press **Ctrl+C** in its terminal and confirm shutdown if prompted. Then run `deactivate` to leave the virtual environment.

### Troubleshooting

| Problem | What to do |
| --- | --- |
| `jupyter: command not found` | Activate `.venv` and install Jupyter using the commands above. |
| No JavaScript kernel is listed | With `.venv` active, rerun `ijsinstall --spec-path=full --hide-undefined`, then restart Jupyter. |
| `ijsinstall` is not found | Reopen your terminal, reactivate `.venv`, and check that npm's global executables are on your PATH. On Windows Command Prompt, try `%APPDATA%\npm\ijsinstall --spec-path=full --hide-undefined`. |
| Syntax errors mentioning Python | Switch from the Python kernel to the JavaScript kernel. |
| `Stack is not defined` | Run all cells from the top so the class definition executes first. |
| Kernel fails after a Node.js upgrade | Reinstall IJavascript under the active Node.js version and rerun the kernel registration command. |
| npm reports a compiler or ZeroMQ build error | Consult the platform-specific prerequisites in the linked IJavascript installation guide. |

## Chapter 7: Sets

[Open the Chapter 7 notebook](src/chapter7/chapter7_examples.ipynb). It includes its own setup instructions and all implementations, examples, exercises, and checks.

After following the installation steps above, activate `.venv` and launch it from the project root:

```sh
jupyter lab src/chapter7/chapter7_examples.ipynb
```

Select the JavaScript kernel, run all cells, and look for `All Chapter 7 checks passed.`
