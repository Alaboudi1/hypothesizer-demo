class TreeNode {
    children: TreeNode[]; 
    question: string; // Question that leads to other nodes
    thisAnswer: string; // The answer to the previous question that lead to this node
    nodeType: string; // hypothesis or question

    constructor(q: string, a: string, qorh: string) {
        this.children = [];
        this.question = q;
        this.thisAnswer = a;
        this.nodeType = qorh;
    }

    //  returns the next node in the graph, when answer is selected
    branch(answer: string) {
        return this.children.forEach(child => {
            if(answer === child.thisAnswer) {
                return child;
            }
        });
    }
}

export function generateExampleTree() : TreeNode {
    // Level 0
    let root = new TreeNode("What framework or technology is being used here?", null, "question");

    // Level 1
    root.children.push(new TreeNode(
        "Is the bug in a functional component or a class component?",
        "React",
        "question"
    ));
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Angular",
        "question"
    ))
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Vue.js",
        "question"
    ))
    root.children.push(new TreeNode(
        "This is not supported yet",
        "Gatsby.js",
        "question"
    ))

    // Level 2
    let current = root.children[0];
    current.children.push(new TreeNode(
        "Is this component mutating the state?", 
        "Functional",
        "question"
    ));
    current.children.push(new TreeNode(
        "Is this component mutating the state?", 
        "Class",
        "question"
    ));

    // Level 3
    current = current.children[0];
    current.children.push(new TreeNode(
        "Is a render expected to take place?",
        "Yes",
        "question"
    ))
    current.children.push(new TreeNode(
        "Is a render expected to take place?",
        "No",
        "question"
    ))
    
    // Level 4
    // let current2 = current.children[1];
    current = current.children[0];
    current.children.push(new TreeNode(
        "Since you are mutating the state and you expect a render to take place, check the location of the state update for any bugs in the implementation",
        "Yes",
        "hypothesis"
    ))
    current.children.push(new TreeNode(
        "Since you are mutating the state and you do not expect a render to take place, remove the state update call",
        "No",
        "hypothesis"
    ))

    // print JSON representation of the tree
    console.log(JSON.stringify(root));
    return root;
};

generateExampleTree();