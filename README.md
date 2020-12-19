# inference_engine

An [inference engine](https://en.wikipedia.org/wiki/Inference_engine) using [backward chaining](https://en.wikipedia.org/wiki/Backward_chaining) algorithm capable of reasoning on a set of rules and initial facts in order to deduce certain other facts. On [node.js](https://nodejs.org/) with a [PEG parser](https://en.wikipedia.org/wiki/Parsing_expression_grammar).

![Recordit GIF](https://i.ibb.co/Sx7nNrn/ezgif-com-crop.gif)

## Input

- Facts are capital letters
- First lines are conditions : <[input expression] => [output expression]>
- Expressions can contain:
  - Facts **[A-Z]**
  - Priority parenthesis **()**
  - Negation **!**
  - Operators [&nbsp;__^__ xor / __+__ and / __|__ or&nbsp;]
- Initial facts line : <=[A-Z]\*>
- Expected results line : <?[A-Z]\*>
- comments **#** ...

> Output expression cannot include _xor_ / _or_ operators

Example:

```
A => C				# A implies C
A + !(B) => D
(D | E) => W
!(!(!C) ^ !(!F)) => G
!E ^ (D + A + B) => F
#(E + (!C | F) + A) + B ^ (A + F) => Z
(E + (!C | F) + A) + B ^ (A + F) => Z

=ABE		# initial facts
?CDWGFZE	# expected results
```

## Usage

> The input file must have the extension .txt

```
npm install

node app.js input/defense/0_and/1_and.txt
```
