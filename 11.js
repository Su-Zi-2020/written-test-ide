function levelOrder(root) {
    let depth = 0;
    let queue = [root];
    while (queue.length > 0) {
        const size = queue.length;
        depth++;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            node.children.forEach(e => {
                queue.push(e);
            });
        }
    }
    return depth;
};



class TreeNode {
    constructor(v) {
        this.value = v;
        this.children = [];
    }
    addChild(node) {
        this.children.push(node);
        return node;
    }
}

const root = new TreeNode(1);
const b1 = root.addChild(new TreeNode(2));
const b2 = root.addChild(new TreeNode(3));
const b3 = root.addChild(new TreeNode(4));

const c1 = b1.addChild(new TreeNode(2));
const c2 = b1.addChild(new TreeNode(3));

const c3 = b2.addChild(new TreeNode(3));


console.log('root', root);

console.log('order', levelOrder(root));