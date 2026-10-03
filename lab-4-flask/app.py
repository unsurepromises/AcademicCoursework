from flask import Flask, render_template, request

app = Flask(__name__)

# Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Profile Page
@app.route('/profile')
def profile():
    return render_template('profile.html')

# Contact Page
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Works Hub Page
@app.route('/works')
def works():
    return render_template('works.html')

# Uppercase Converter Page
@app.route('/works/touppercase', methods=['GET', 'POST'])
def touppercase():
    result = None
    if request.method == 'POST':
        input_string = request.form.get('inputString', '')
        result = input_string.upper()
    return render_template('touppercase.html', result=result)

# Area of Circle Page
@app.route('/works/area/circle', methods=['GET', 'POST'])
def area_circle():
    result = None
    if request.method == 'POST':
        r = float(request.form.get('radius', 0))
        result = 3.14159 * (r ** 2)
    return render_template('circle.html', result=result)

# Area of Triangle Page
@app.route('/works/area/triangle', methods=['GET', 'POST'])
def area_triangle():
    result = None
    if request.method == 'POST':
        base = float(request.form.get('base', 0))
        height = float(request.form.get('height', 0))
        result = 0.5 * base * height
    return render_template('triangle.html', result=result)


# linked list ngani
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def delete(self, data):
        if not self.head:
            return False
        if str(self.head.data) == str(data):
            self.head = self.head.next
            return True
        curr = self.head
        while curr.next and str(curr.next.data) != str(data):
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next
            return True
        return False

    def clear(self):
        self.head = None

    def to_list(self):
        result = []
        curr = self.head
        while curr:
            result.append(curr.data)
            curr = curr.next
        return result


# global list instance for the linked list
linked_list = LinkedList()


#route linked list
@app.route('/works/linkedlist', methods=['GET', 'POST'])
def linked_list_view():
    message = None
    if request.method == 'POST':
        action = request.form.get('action')

        if action == 'add':
            val = request.form.get('node_value', '').strip()
            if val:
                linked_list.append(val)
        elif action == 'delete':
            val = request.form.get('delete_value', '').strip()
            if val:
                found = linked_list.delete(val)
                if not found:
                    message = f"Node '{val}' not found in the list."
        elif action == 'clear':
            linked_list.clear()

    return render_template('linkedlist.html', nodes=linked_list.to_list(), message=message)
if __name__ == '__main__':
    app.run(debug=True)