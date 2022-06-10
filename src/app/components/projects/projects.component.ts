import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: readonly Project[] = [];

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
    this.dbconnection.selectProjects().then((projects:readonly Project[]) => {
      this.projects = projects;
    });
  }

}
