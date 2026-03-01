bash
command
find /tmp/inputs/zev -type f -name "*.py" | head -20

output
/tmp/inputs/zev/src/zev/command_selector.py
/tmp/inputs/zev/src/zev/constants.py
/tmp/inputs/zev/src/zev/main.py
/tmp/inputs/zev/src/zev/command_history.py
/tmp/inputs/zev/src/zev/utils.py
/tmp/inputs/zev/src/zev/llms/__init__.py
/tmp/inputs/zev/src/zev/llms/llm.py
/tmp/inputs/zev/src/zev/llms/types.py
/tmp/inputs/zev/src/zev/llms/inference_provider_base.py
/tmp/inputs/zev/src/zev/llms/openai/__init__.py
/tmp/inputs/zev/src/zev/llms/openai/provider.py
/tmp/inputs/zev/src/zev/llms/openai/setup.py
/tmp/inputs/zev/src/zev/llms/gemini/__init__.py
/tmp/inputs/zev/src/zev/llms/gemini/provider.py
/tmp/inputs/zev/src/zev/llms/gemini/setup.py
/tmp/inputs/zev/src/zev/llms/azure_openai/__init__.py
/tmp/inputs/zev/src/zev/llms/azure_openai/provider.py
/tmp/inputs/zev/src/zev/llms/azure_openai/setup.py
/tmp/inputs/zev/src/zev/llms/ollama/__init__.py
/tmp/inputs/zev/src/zev/llms/ollama/provider.py

str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/utils.py

output
     1	import os
2	import platform
3
4	import questionary
5
6	CLI_STYLE = questionary.Style(
7	    [
8	        ("qmark", "#98c379"),
9	        ("question", "#98c379"),
10	        ("instruction", "italic #646464"),
11	    ]
12	)
13
14
15	def get_input_string(
16	    field_name: str,
17	    prompt_text: str,
18	    default: str = "",
19	    required: bool = False,
20	    help_text: str = "",
21	) -> str:
22	    """Ask for a single line of input in the terminal, with colour + hint."""
23	    base = f"{prompt_text} (default: {default})" if default else prompt_text
24
25	    while True:
26	        value = questionary.text(
27	            message=base,
28	            default=default,
29	            instruction=help_text or None,
30	            style=CLI_STYLE,
31	            validate=lambda t: bool(t) if required else True,
32	        ).ask()
33
34	        if value is None:  # user pressed Ctrl-C / Ctrl-D
35	            raise KeyboardInterrupt
36	        if value == "" and default:  # user just hit ↵
37	            return default
38	        if value or not required:
39	            return value
40
41	        # Required but empty ─ repeat
42	        print(f"{field_name} is required, please try again.")
43
44
45	def get_env_context() -> str:
46	    os_name = platform.platform(aliased=True)
47	    shell = os.environ.get("SHELL") or os.environ.get("COMSPEC")
48	    return f"OS: {os_name}\nSHELL: {shell}" if shell else f"OS: {os_name}"
49
50
51	def show_help():
52	    print("""
53	Zev is a simple CLI tool to help you remember terminal commands.
54
55	Usage:
56	zev "<query>"               Describe what you want to do
57	zev --help, -h            Show this help message
58	zev --recent, -r          Show recently run commands and results
59	zev --setup, -s           Run setup again
60	zev --version, -v         Show version information
61	""")
62	

str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/main.py

output
     1	import sys
2	from pathlib import Path
3
4	import dotenv
5	from rich import print as rprint
6	from rich.console import Console
7
8	from zev.command_history import CommandHistory
9	from zev.command_selector import show_options
10	from zev.config import config
11	from zev.config.setup import run_setup
12	from zev.constants import CONFIG_FILE_NAME
13	from zev.llms.llm import get_inference_provider
14	from zev.utils import get_env_context, get_input_string, show_help
15
16	command_history = CommandHistory()
17
18
19	def setup():
20	    run_setup()
21
22
23	def get_options(words: str):
24	    context = get_env_context()
25	    console = Console()
26	    rprint(f"")
27	    with console.status(
28	        f"[bold blue]Thinking... [grey39](running query using {config.llm_provider} backend)", spinner="dots"
29	    ):
30	        inference_provider = get_inference_provider()
31	        response = inference_provider.get_options(prompt=words, context=context)
32	        command_history.save_options(words, response)
33
34	    if response is None:
35	        return
36
37	    if not response.is_valid:
38	        print(response.explanation_if_not_valid)
39	        return
40
41	    if not response.commands:
42	        print("No commands available")
43	        return
44
45	    show_options(response.commands)
46
47
48	def run_no_prompt():
49	    input = get_input_string("input", "Describe what you want to do:", required=False, help_text="(-h for help)")
50	    if handle_special_case(input):
51	        return
52	    get_options(input)
53
54
55	def handle_special_case(args):
56	    if not args:
57	        return False
58
59	    if isinstance(args, str):
60	        args = args.split()
61
62	    if len(args) > 1:
63	        return False
64
65	    command = args[0].lower()
66
67	    if command == "--setup" or command == "-s":
68	        setup()
69	        return True
70
71	    if command == "--version" or command == "-v":
72	        print("zev version: 0.8.1")
73	        return True
74
75	    if command == "--recent" or command == "-r":
76	        command_history.show_history()
77	        return True
78
79	    if command == "--help" or command == "-h":
80	        show_help()
81	        return True
82
83	    return False
84
85
86	def app():
87	    # check if .zevrc exists or if setting up again
88	    config_path = Path.home() / CONFIG_FILE_NAME
89	    args = [arg.strip() for arg in sys.argv[1:]]
90
91	    if not config_path.exists():
92	        run_setup()
93	        print("Setup complete...\n")
94	        if len(args) == 1 and args[0] == "--setup":
95	            return
96
97	    if handle_special_case(args):
98	        return
99
100	    dotenv.load_dotenv(config_path, override=True)
101
102	    if not args:
103	        run_no_prompt()
104	        return
105
106	    # Strip any trailing question marks from the input
107	    query = " ".join(args).rstrip("?")
108	    get_options(query)
109
110
111	if __name__ == "__main__":
112	    app()
113	
Let me also look at how the codebase handles console output to follow the same patterns:
str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/command_selector.py

output
     1	from subprocess import run as run_command
2
3	import pyperclip
4	import questionary
5	from rich import print as rprint
6
7	from zev.llms.types import Command
8
9
10	def show_options(commands: list[Command]):
11	    options = assemble_options(commands)
12	    selected = display_options(options)
13	    handle_selected_option(selected)
14
15
16	def assemble_options(commands: list[Command]):
17	    options = [questionary.Choice(cmd.command, description=cmd.short_explanation, value=cmd) for cmd in commands]
18	    options.append(questionary.Choice("Cancel"))
19	    options.append(questionary.Separator())
20	    return options
21
22
23	def display_options(options: list[questionary.Choice]):
24	    selected = questionary.select(
25	        "Select command:",
26	        choices=options,
27	        use_shortcuts=True,
28	        style=questionary.Style(
29	            [
30	                ("answer", "fg:#61afef"),
31	                ("question", "bold"),
32	                ("instruction", "fg:#98c379"),
33	            ]
34	        ),
35	    ).ask()
36	    return selected
37
38
39	def handle_selected_option(selected):
40	    if selected and selected != "Cancel":
41	        print("")
42	        if selected.dangerous_explanation:
43	            rprint(f"[red]⚠️ Warning: {selected.dangerous_explanation}[/red]\n")
44	        try:
45	            pyperclip.copy(selected.command)
46	            rprint("[green]✓[/green] Copied to clipboard")
47	        except pyperclip.PyperclipException as e:
48	            rprint(
49	                "[red]Could not copy to clipboard (see https://github.com/dtnewman/zev?tab=readme-ov-file#-dependencies)[/red]\n"
50	            )
51	            rprint("[cyan]Here is your command:[/cyan]")
52	            print(selected.command)
53	            if questionary.confirm("Would you like to run it?").ask():
54	                print("Running command:", selected.command)
55	                run_command(selected.command, shell=True)
56	

str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/constants.py

output
     1	class LLMProviders:
2	    OPENAI = "openai"
3	    OLLAMA = "ollama"
4	    GEMINI = "gemini"
5	    AZURE_OPENAI = "azure_openai"
6
7
8	DEFAULT_PROVIDER = LLMProviders.OPENAI
9
10	# Default model names for each provider
11	OPENAI_DEFAULT_MODEL = "gpt-4o-mini"
12	GEMINI_DEFAULT_MODEL = "gemini-2.0-flash"
13	GEMINI_BASE_URL = "https://generativelanguage.googleapis.com"
14
15	OPENAI_BASE_URL = "https://api.openai.com/v1"
16	CONFIG_FILE_NAME = ".zevrc"
17	HISTORY_FILE_NAME = ".zevhistory"
18
19
20	PROMPT = """
21	You are a helpful assistant that helps users remember commands for the terminal. You
22	will return a JSON object with a list of at most three options.
23
24	The options should be related to the prompt that the user provides (the prompt might
25	either be desciptive or in the form of a question).
26
27	The options should be in the form of a command that can be run in a bash terminal.
28
29	If the user prompt is not clear, return an empty list and set is_valid to false, and
30	provide an explanation of why it is not clear in the explanation_if_not_valid field.
31
32	If you provide an option that is likely to be dangerous, set is_dangerous to true for
33	that option. For example, the command 'git reset --hard' is dangerous because it can
34	delete all the user's local changes. 'rm -rf' is dangerous because it can delete all
35	the files in the user's directory. If something is marked as dangerous, provide a
36	short explanation of why it is dangerous in the dangerous_explanation field (leave
37	this field empty if the option is not dangerous).
38
39	Otherwise, set is_valid to true, leave explanation_if_not_valid empty, and provide the
40	commands in the commands field (remember, up to 3 options, and they all must be commands
41	that can be run in a bash terminal without changing anything). Each command should have
42	a short explanation of what it does.
43
44	Here is some context about the user's environment:
45
46	==============
47
48	{context}
49
50	==============
51
52	Here is the users prompt:
53
54	==============
55
56	{prompt}
57	"""
58	
Now I have a good understanding of the codebase style. Let me implement the `validate_query` function in `utils.py` and integrate it into `main.py`:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/zev/src/zev/utils.py
old_str
import os
import platform

import questionary
new_str
import os
import platform
import re

import questionary

output
The file /tmp/inputs/zev/src/zev/utils.py has been edited successfully.

str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/zev/src/zev/utils.py
old_str
def show_help():
    print("""
Zev is a simple CLI tool to help you remember terminal commands.

Usage:
zev "<query>"               Describe what you want to do
zev --help, -h            Show this help message
zev --recent, -r          Show recently run commands and results
zev --setup, -s           Run setup again
zev --version, -v         Show version information
""")
new_str
def show_help():
    print("""
Zev is a simple CLI tool to help you remember terminal commands.

Usage:
zev "<query>"               Describe what you want to do
zev --help, -h            Show this help message
zev --recent, -r          Show recently run commands and results
zev --setup, -s           Run setup again
zev --version, -v         Show version information
""")


def validate_query(query: str) -> tuple[bool, str, str]:
    if not query or not query.strip():
        return (False, "Query cannot be empty. Please take time and describe what you want to do.", "")

    sanitized = query.strip()

    shell_chars = [";", "|", "&", "$", "`"]
    for char in shell_chars:
        sanitized = sanitized.replace(char, "")

    warning = ""
    if len(sanitized) > 1000:
        sanitized = sanitized[:1000] + "..."
        warning = "Query truncated to 1000 characters."

    return (True, warning, sanitized)

output
The file /tmp/inputs/zev/src/zev/utils.py has been edited successfully.
Now let me integrate this into `main.py`:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/zev/src/zev/main.py
old_str
from zev.utils import get_env_context, get_input_string, show_help
new_str
from zev.utils import get_env_context, get_input_string, show_help, validate_query

output
The file /tmp/inputs/zev/src/zev/main.py has been edited successfully.

str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/zev/src/zev/main.py
old_str
def get_options(words: str):
    context = get_env_context()
    console = Console()
    rprint(f"")
    with console.status(
        f"[bold blue]Thinking... [grey39](running query using {config.llm_provider} backend)", spinner="dots"
    ):
        inference_provider = get_inference_provider()
        response = inference_provider.get_options(prompt=words, context=context)
        command_history.save_options(words, response)

    if response is None:
        return

    if not response.is_valid:
        print(response.explanation_if_not_valid)
        return

    if not response.commands:
        print("No commands available")
        return

    show_options(response.commands)
new_str
def get_options(words: str):
    is_valid, message, sanitized_query = validate_query(words)

    if not is_valid:
        rprint(f"[red]{message}[/red]")
        return

    if message:
        rprint(f"[yellow]{message}[/yellow]")

    context = get_env_context()
    console = Console()
    rprint(f"")
    with console.status(
        f"[bold blue]Thinking... [grey39](running query using {config.llm_provider} backend)", spinner="dots"
    ):
        inference_provider = get_inference_provider()
        response = inference_provider.get_options(prompt=sanitized_query, context=context)
        command_history.save_options(sanitized_query, response)

    if response is None:
        return

    if not response.is_valid:
        print(response.explanation_if_not_valid)
        return

    if not response.commands:
        print("No commands available")
        return

    show_options(response.commands)

output
The file /tmp/inputs/zev/src/zev/main.py has been edited successfully.
Let me verify the changes look correct:
str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/utils.py

output
     1	import os
2	import platform
3	import re
4
5	import questionary
6
7	CLI_STYLE = questionary.Style(
8	    [
9	        ("qmark", "#98c379"),
10	        ("question", "#98c379"),
11	        ("instruction", "italic #646464"),
12	    ]
13	)
14
15
16	def get_input_string(
17	    field_name: str,
18	    prompt_text: str,
19	    default: str = "",
20	    required: bool = False,
21	    help_text: str = "",
22	) -> str:
23	    """Ask for a single line of input in the terminal, with colour + hint."""
24	    base = f"{prompt_text} (default: {default})" if default else prompt_text
25
26	    while True:
27	        value = questionary.text(
28	            message=base,
29	            default=default,
30	            instruction=help_text or None,
31	            style=CLI_STYLE,
32	            validate=lambda t: bool(t) if required else True,
33	        ).ask()
34
35	        if value is None:  # user pressed Ctrl-C / Ctrl-D
36	            raise KeyboardInterrupt
37	        if value == "" and default:  # user just hit ↵
38	            return default
39	        if value or not required:
40	            return value
41
42	        # Required but empty ─ repeat
43	        print(f"{field_name} is required, please try again.")
44
45
46	def get_env_context() -> str:
47	    os_name = platform.platform(aliased=True)
48	    shell = os.environ.get("SHELL") or os.environ.get("COMSPEC")
49	    return f"OS: {os_name}\nSHELL: {shell}" if shell else f"OS: {os_name}"
50
51
52	def show_help():
53	    print("""
54	Zev is a simple CLI tool to help you remember terminal commands.
55
56	Usage:
57	zev "<query>"               Describe what you want to do
58	zev --help, -h            Show this help message
59	zev --recent, -r          Show recently run commands and results
60	zev --setup, -s           Run setup again
61	zev --version, -v         Show version information
62	""")
63
64
65	def validate_query(query: str) -> tuple[bool, str, str]:
66	    if not query or not query.strip():
67	        return (False, "Query cannot be empty. Please take time and describe what you want to do.", "")
68
69	    sanitized = query.strip()
70
71	    shell_chars = [";", "|", "&", "$", "`"]
72	    for char in shell_chars:
73	        sanitized = sanitized.replace(char, "")
74
75	    warning = ""
76	    if len(sanitized) > 1000:
77	        sanitized = sanitized[:1000] + "..."
78	        warning = "Query truncated to 1000 characters."
79
80	    return (True, warning, sanitized)
81	

str_replace_based_edit_tool
command
view
path
/tmp/inputs/zev/src/zev/main.py

output
     1	import sys
2	from pathlib import Path
3
4	import dotenv
5	from rich import print as rprint
6	from rich.console import Console
7
8	from zev.command_history import CommandHistory
9	from zev.command_selector import show_options
10	from zev.config import config
11	from zev.config.setup import run_setup
12	from zev.constants import CONFIG_FILE_NAME
13	from zev.llms.llm import get_inference_provider
14	from zev.utils import get_env_context, get_input_string, show_help, validate_query
15
16	command_history = CommandHistory()
17
18
19	def setup():
20	    run_setup()
21
22
23	def get_options(words: str):
24	    is_valid, message, sanitized_query = validate_query(words)
25
26	    if not is_valid:
27	        rprint(f"[red]{message}[/red]")
28	        return
29
30	    if message:
31	        rprint(f"[yellow]{message}[/yellow]")
32
33	    context = get_env_context()
34	    console = Console()
35	    rprint(f"")
36	    with console.status(
37	        f"[bold blue]Thinking... [grey39](running query using {config.llm_provider} backend)", spinner="dots"
38	    ):
39	        inference_provider = get_inference_provider()
40	        response = inference_provider.get_options(prompt=sanitized_query, context=context)
41	        command_history.save_options(sanitized_query, response)
42
43	    if response is None:
44	        return
45
46	    if not response.is_valid:
47	        print(response.explanation_if_not_valid)
48	        return
49
50	    if not response.commands:
51	        print("No commands available")
52	        return
53
54	    show_options(response.commands)
55
56
57	def run_no_prompt():
58	    input = get_input_string("input", "Describe what you want to do:", required=False, help_text="(-h for help)")
59	    if handle_special_case(input):
60	        return
61	    get_options(input)
62
63
64	def handle_special_case(args):
65	    if not args:
66	        return False
67
68	    if isinstance(args, str):
69	        args = args.split()
70
71	    if len(args) > 1:
72	        return False
73
74	    command = args[0].lower()
75
76	    if command == "--setup" or command == "-s":
77	        setup()
78	        return True
79
80	    if command == "--version" or command == "-v":
81	        print("zev version: 0.8.1")
82	        return True
83
84	    if command == "--recent" or command == "-r":
85	        command_history.show_history()
86	        return True
87
88	    if command == "--help" or command == "-h":
89	        show_help()
90	        return True
91
92	    return False
93
94
95	def app():
96	    # check if .zevrc exists or if setting up again
97	    config_path = Path.home() / CONFIG_FILE_NAME
98	    args = [arg.strip() for arg in sys.argv[1:]]
99
100	    if not config_path.exists():
101	        run_setup()
102	        print("Setup complete...\n")
103	        if len(args) == 1 and args[0] == "--setup":
104	            return
105
106	    if handle_special_case(args):
107	        return
108
109	    dotenv.load_dotenv(config_path, override=True)
110
111	    if not args:
112	        run_no_prompt()
113	        return
114
115	    # Strip any trailing question marks from the input
116	    query = " ".join(args).rstrip("?")
117	    get_options(query)
118
119
120	if __name__ == "__main__":
121	    app()
122	
I notice I imported `re` but didn't use it - let me remove that:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/zev/src/zev/utils.py
old_str
import os
import platform
import re

import questionary
new_str
import os
import platform

import questionary

output
The file /tmp/inputs/zev/src/zev/utils.py has been edited successfully.
Now let me run the tests to make sure everything works:
bash
command
cd /tmp/inputs/zev && python -c "from zev.utils import validate_query; print(validate_query('')); print(validate_query('   ')); print(validate_query('hello world')); print(validate_query('test; rm -rf /'))" 2>&1

output
Traceback (most recent call last):
File "<string>", line 1, in <module>
ModuleNotFoundError: No module named 'zev'

bash
command
cd /tmp/inputs/zev && pip install -e . -q 2>&1 | tail -5

output
ERROR: Project file:///tmp/inputs/zev has a 'pyproject.toml' and its build backend is missing the 'build_editable' hook. Since it does not have a 'setup.py' nor a 'setup.cfg', it cannot be installed in editable mode. Consider using a build backend that supports PEP 660.

bash
command
cd /tmp/inputs/zev && pip install . -q 2>&1 | tail -5

output
ERROR: Could not find a version that satisfies the requirement openai>=1.72.0 (from zev) (from versions: 0.0.2, 0.1.0, 0.1.1, 0.1.2, 0.1.3, 0.2.0, 0.2.1, 0.2.3, 0.2.4, 0.2.5, 0.2.6, 0.3.0, 0.4.0, 0.6.0, 0.6.1, 0.6.2, 0.6.3, 0.6.4, 0.7.0, 0.8.0, 0.9.0, 0.9.1, 0.9.2, 0.9.3, 0.9.4, 0.10.0, 0.10.1, 0.10.2, 0.10.3, 0.10.4, 0.10.5, 0.11.0, 0.11.1, 0.11.2, 0.11.3, 0.11.4, 0.11.5, 0.11.6, 0.12.0, 0.13.0, 0.14.0, 0.15.0, 0.16.0)
ERROR: No matching distribution found for openai>=1.72.0

bash
command
cd /tmp/inputs/zev && PYTHONPATH=src python -c "
from zev.utils import validate_query

# Test empty
print('Empty:', validate_query(''))

# Test whitespace only
print('Whitespace:', validate_query('   '))

# Test normal
print('Normal:', validate_query('hello world'))

# Test shell injection
print('Shell injection:', validate_query('test; rm -rf /'))
print('More shell:', validate_query('echo \$HOME | cat'))

# Test truncation
long_query = 'a' * 1050
result = validate_query(long_query)
print('Long query valid:', result[0])
print('Long query message:', result[1])
print('Long query length:', len(result[2]))
"

Traceback (most recent call last): File "<string>", line 2, in <module> File "/tmp/inputs/zev/src/zev/utils.py", line 4, in <module> import questionary ModuleNotFoundError: No module named 'questionary'

bash
command
pip install questionary -q && cd /tmp/inputs/zev && PYTHONPATH=src python -c "
from zev.utils import validate_query

# Test empty
print('Empty:', validate_query(''))

# Test whitespace only
print('Whitespace:', validate_query('   '))

# Test normal
print('Normal:', validate_query('hello world'))

# Test shell injection
print('Shell injection:', validate_query('test; rm -rf /'))
print('More shell:', validate_query('echo \$HOME | cat'))

# Test truncation
long_query = 'a' * 1050
result = validate_query(long_query)
print('Long query valid:', result[0])
print('Long query message:', result[1])
print('Long query length:', len(result[2]))
"

output
Empty: (False, 'Query cannot be empty. Please take time and describe what you want to do.', '')
Whitespace: (False, 'Query cannot be empty. Please take time and describe what you want to do.', '')
Normal: (True, '', 'hello world')
Shell injection: (True, '', 'test rm -rf /')
More shell: (True, '', 'echo HOME  cat')
Long query valid: True
Long query message: Query truncated to 1000 characters.
Long query length: 1003
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
zev 0.8.1 requires openai>=1.72.0, which is not installed.
zev 0.8.1 requires pyperclip>=1.9.0, which is not installed.
zev 0.8.1 requires python-dotenv>=1.0.1, which is not installed.
zev 0.8.1 requires pydantic>=2.10.6, but you have pydantic 2.9.2 which is incompatible.
zev 0.8.1 requires questionary>=2.1.0, but you have questionary 1.10.0 which is incompatible.
zev 0.8.1 requires rich>=13.9.4, but you have rich 13.9.2 which is incompatible.
All tests pass. Let me copy the output files:
bash
command
mkdir -p /tmp/outputs && cp /tmp/inputs/zev/src/zev/utils.py /tmp/outputs/ && cp /tmp/inputs/zev/src/zev/main.py /tmp/outputs/

system
Tool ran without output or errors

str_replace_based_edit_tool
command
view
path
/tmp/outputs

output
5.5K	/tmp/outputs
3.0K	/tmp/outputs/main.py
2.5K	/tmp/outputs/utils.py

str_replace_based_edit_tool
command
view
path
/tmp/outputs/utils.py

output
     1	import os
2	import platform
3
4	import questionary
5
6	CLI_STYLE = questionary.Style(
7	    [
8	        ("qmark", "#98c379"),
9	        ("question", "#98c379"),
10	        ("instruction", "italic #646464"),
11	    ]
12	)
13
14
15	def get_input_string(
16	    field_name: str,
17	    prompt_text: str,
18	    default: str = "",
19	    required: bool = False,
20	    help_text: str = "",
21	) -> str:
22	    """Ask for a single line of input in the terminal, with colour + hint."""
23	    base = f"{prompt_text} (default: {default})" if default else prompt_text
24
25	    while True:
26	        value = questionary.text(
27	            message=base,
28	            default=default,
29	            instruction=help_text or None,
30	            style=CLI_STYLE,
31	            validate=lambda t: bool(t) if required else True,
32	        ).ask()
33
34	        if value is None:  # user pressed Ctrl-C / Ctrl-D
35	            raise KeyboardInterrupt
36	        if value == "" and default:  # user just hit ↵
37	            return default
38	        if value or not required:
39	            return value
40
41	        # Required but empty ─ repeat
42	        print(f"{field_name} is required, please try again.")
43
44
45	def get_env_context() -> str:
46	    os_name = platform.platform(aliased=True)
47	    shell = os.environ.get("SHELL") or os.environ.get("COMSPEC")
48	    return f"OS: {os_name}\nSHELL: {shell}" if shell else f"OS: {os_name}"
49
50
51	def show_help():
52	    print("""
53	Zev is a simple CLI tool to help you remember terminal commands.
54
55	Usage:
56	zev "<query>"               Describe what you want to do
57	zev --help, -h            Show this help message
58	zev --recent, -r          Show recently run commands and results
59	zev --setup, -s           Run setup again
60	zev --version, -v         Show version information
61	""")
62
63
64	def validate_query(query: str) -> tuple[bool, str, str]:
65	    if not query or not query.strip():
66	        return (False, "Query cannot be empty. Please take time and describe what you want to do.", "")
67
68	    sanitized = query.strip()
69
70	    shell_chars = [";", "|", "&", "$", "`"]
71	    for char in shell_chars:
72	        sanitized = sanitized.replace(char, "")
73
74	    warning = ""
75	    if len(sanitized) > 1000:
76	        sanitized = sanitized[:1000] + "..."
77	        warning = "Query truncated to 1000 characters."
78
79	    return (True, warning, sanitized)
80	

str_replace_based_edit_tool
command
view
path
/tmp/outputs/main.py

output
     1	import sys
2	from pathlib import Path
3
4	import dotenv
5	from rich import print as rprint
6	from rich.console import Console
7
8	from zev.command_history import CommandHistory
9	from zev.command_selector import show_options
10	from zev.config import config
11	from zev.config.setup import run_setup
12	from zev.constants import CONFIG_FILE_NAME
13	from zev.llms.llm import get_inference_provider
14	from zev.utils import get_env_context, get_input_string, show_help, validate_query
15
16	command_history = CommandHistory()
17
18
19	def setup():
20	    run_setup()
21
22
23	def get_options(words: str):
24	    is_valid, message, sanitized_query = validate_query(words)
25
26	    if not is_valid:
27	        rprint(f"[red]{message}[/red]")
28	        return
29
30	    if message:
31	        rprint(f"[yellow]{message}[/yellow]")
32
33	    context = get_env_context()
34	    console = Console()
35	    rprint(f"")
36	    with console.status(
37	        f"[bold blue]Thinking... [grey39](running query using {config.llm_provider} backend)", spinner="dots"
38	    ):
39	        inference_provider = get_inference_provider()
40	        response = inference_provider.get_options(prompt=sanitized_query, context=context)
41	        command_history.save_options(sanitized_query, response)
42
43	    if response is None:
44	        return
45
46	    if not response.is_valid:
47	        print(response.explanation_if_not_valid)
48	        return
49
50	    if not response.commands:
51	        print("No commands available")
52	        return
53
54	    show_options(response.commands)
55
56
57	def run_no_prompt():
58	    input = get_input_string("input", "Describe what you want to do:", required=False, help_text="(-h for help)")
59	    if handle_special_case(input):
60	        return
61	    get_options(input)
62
63
64	def handle_special_case(args):
65	    if not args:
66	        return False
67
68	    if isinstance(args, str):
69	        args = args.split()
70
71	    if len(args) > 1:
72	        return False
73
74	    command = args[0].lower()
75
76	    if command == "--setup" or command == "-s":
77	        setup()
78	        return True
79
80	    if command == "--version" or command == "-v":
81	        print("zev version: 0.8.1")
82	        return True
83
84	    if command == "--recent" or command == "-r":
85	        command_history.show_history()
86	        return True
87
88	    if command == "--help" or command == "-h":
89	        show_help()
90	        return True
91
92	    return False
93
94
95	def app():
96	    # check if .zevrc exists or if setting up again
97	    config_path = Path.home() / CONFIG_FILE_NAME
98	    args = [arg.strip() for arg in sys.argv[1:]]
99
100	    if not config_path.exists():
101	        run_setup()
102	        print("Setup complete...\n")
103	        if len(args) == 1 and args[0] == "--setup":
104	            return
105
106	    if handle_special_case(args):
107	        return
108
109	    dotenv.load_dotenv(config_path, override=True)
110
111	    if not args:
112	        run_no_prompt()
113	        return
114
115	    # Strip any trailing question marks from the input
116	    query = " ".join(args).rstrip("?")
117	    get_options(query)
118
119
120	if __name__ == "__main__":
121	    app()
122	
Done. I've implemented the `validate_query` function in `utils.py` and integrated it into `main.py`:

**utils.py changes:**
- Added `validate_query(query: str) -> tuple[bool, str, str]` function that:
- Rejects empty/whitespace-only queries with the specified error message
- Sanitizes shell injection characters (`;`, `|`, `&`, `$`, backticks)
- Truncates queries longer than 1000 chars, appending "..." and returning a warning
- Returns `(is_valid, message, sanitized_query)` tuple

**main.py changes:**
- Imported `validate_query` from utils
- Added validation at the start of `get_options()` before the LLM call
- Shows error in red via `rprint` if validation fails and returns early
- Shows warning in yellow if query was truncated
- Uses the sanitized query for the LLM request and history