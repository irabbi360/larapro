<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button @click="initAddTask()" class="btn btn-primary btn-xs pull-right">
                            + Add New Task
                        </button>
                        My Tasks
                    </div>

                    <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
                            <tbody>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Image
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                            <tr v-for="(task, index) in tasks">
                                <td>{{ index + 1 }} {{ task.name }}</td>
                                <td>
                                    {{ task.email }}
                                </td>
                                <td>
                                    {{ task.image }}
                                </td>
                                <td>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" tabindex="-1" role="dialog" id="update_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Update Task</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Name" name="name" class="form-control"
                                   v-model="update.name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input id="email" type="text" placeholder="Email" class="form-control"
                                   v-model="update.email">
                        </div>
                        <div class="form-group">
                            <label for="image">Image:</label>
                            <input id="image" type="file" class="form-control"
                                   @change="imageChanged">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="updateTask" class="btn btn-primary">Submit</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

    </div>
</template>

<script>
    export default {
        data(){
            return {
                task: {
                    name: '',
                    email: '',
                    image: ''
                },
                errors: [],
                tasks: [],
                update: {}
            }
        },
        mounted()
        {
            this.readTasks();
        },
        methods: {
            imageChanged (e) {
              console.log(e.target)
                var fileReader = new FileReader()

                fileReader.readAsDataURL(e.target.files[0])
            },
            initAddTask()
            {
                $("#add_task_model").modal("show");
            },
            reset()
            {
                this.task.name = '';
                this.task.email = '';
                this.task.image = '';
            },
            readTasks()
            {
                axios.get('/user')
                    .then(response => {

                        this.tasks = response.data.tasks;

                    });
            },
            initUpdate(index)
            {
                this.errors = [];
                $("#update_task_model").modal("show");
                this.update = this.tasks[index];
            },
            updateTask()
            {
                axios.patch('/user/' + this.update.id, {
                    name: this.update.name,
                    email: this.update.email,
                    image: this.update.image,
                })
                    .then(response => {

                        $("#update_task_model").modal("hide");

                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.errors.name) {
                            this.errors.push(error.response.data.errors.name[0]);
                        }

                        if (error.response.data.errors.email) {
                            this.errors.push(error.response.data.errors.email[0]);
                        }
                        if (error.response.data.errors.image) {
                            this.errors.push(error.response.data.errors.image[0]);
                        }
                    });
            }
        }
    }
</script>