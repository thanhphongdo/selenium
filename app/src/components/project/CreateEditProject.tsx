import { Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { ProjectItemInterface } from '../../store/root_state_interface';
import BaseComponent from '../BaseComponent';
import Modal from '../controls/Modal';

export enum ProjectMode {
    CREATE = 1,
    EDIT = 2
}

@Component({
    components: { Modal },
    methods: {
        ...mapActions(['createProject', 'editProject'])
    }
})
export default class CreateEditProject extends BaseComponent {
    createProjectModal!: Modal;
    mode!: ProjectMode;
    currentProjectId!: string;
    projectModel: ProjectItemInterface = {
        projectId: '',
        projectTitle: '',
        projectDesc: ''
    }
    createProject!: (projectItem: ProjectItemInterface) => Promise<any>;
    editProject!: (project: {
        currentProjectId: string;
        projectData: ProjectItemInterface;
    }) => Promise<any>;
    constructor() {
        super();
    }

    mounted() {
        this.$emit('addRef', this);
    }

    clearProjectModel() {
        this.currentProjectId = '';
        this.projectModel = {
            projectId: '',
            projectTitle: '',
            projectDesc: ''
        }
    }

    create() {
        this.clearProjectModel();
        this.mode = ProjectMode.CREATE;
        this.createProjectModal.show();
    }

    edit(projectData: ProjectItemInterface) {
        this.clearProjectModel();
        this.mode = ProjectMode.EDIT;
        this.currentProjectId = projectData.projectId;
        this.projectModel = projectData;
        this.createProjectModal.show();
    }

    save() {
        this.showLoading();
        if (this.mode == ProjectMode.CREATE) {
            this.createProject(this.projectModel).then(() => this.hideLoading()).catch(() => this.hideLoading());;
        }
        if (this.mode == ProjectMode.EDIT) {
            this.editProject({
                currentProjectId: this.currentProjectId,
                projectData: this.projectModel
            }).then(() => this.hideLoading()).catch(() => this.hideLoading());;
        }
        this.clearProjectModel();
        this.createProjectModal.hide();
    }

    render() {
        return (
            <div>
                <Modal id="create-project" on-addRef={(modal: Modal) => this.createProjectModal = modal} settings={{ duration: 500 }}
                    {...{
                        scopedSlots: {
                            modalHeader: () => {
                                return (<div>{this.mode == ProjectMode.CREATE ? 'Create new' : 'Edit'} Project</div>);
                            },
                            modalContent: () => {
                                return (
                                    <div>
                                        <form class="ui form">
                                            <div class="field">
                                                <label>Project ID</label>
                                                <input type="text" required v-model={this.projectModel.projectId} name="project-id" placeholder="Project ID" />
                                            </div>
                                            <div class="field">
                                                <label>Project title</label>
                                                <input type="text" v-model={this.projectModel.projectTitle} name="project-title" placeholder="Project title" />
                                            </div>
                                            <div class="field">
                                                <label>Project description</label>
                                                <textarea type="text" v-model={this.projectModel.projectDesc} name="project-description" placeholder="Project description"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                );
                            },
                            modalActions: () => {
                                return (
                                    <div>
                                        <div class="ui primary button" on-click={this.save}>Save</div>
                                        <div class="ui cancel button" on-click={this.clearProjectModel}>Cancel</div>
                                    </div>
                                );
                            }
                        }
                    }
                    }>
                </Modal>
            </div>
        );
    }
}
