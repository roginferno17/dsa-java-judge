class Solution {
    public boolean determinesUniqueTree(String first, String second) {
        if (first.equals(second)) return false;
        // Exactly one of the two must be the inorder traversal.
        return first.equals("inorder") ^ second.equals("inorder");
    }
}
