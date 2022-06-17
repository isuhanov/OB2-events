import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public typeProject: FormControl = new FormControl('Все');

  public projects: readonly Project[] = [];
  public isExists: boolean = true;

  public onFilterClick(): void {
    this.dbconnection.selectProjects(this.typeProject.value).then((projects:readonly Project[]) => {
      if (projects.length == 0) {
        this.isExists = false;
      } else {
        this.projects = projects;
        this.isExists = true;
      }
    });
  }

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
    this.dbconnection.selectProjects().then((projects:readonly Project[]) => {
      if (projects.length == 0) {
        this.isExists = false;
      } else {
        this.projects = projects;
        this.isExists = true;
      }
    });
  }


}
