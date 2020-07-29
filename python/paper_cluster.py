import random
import numpy as np

def get_positions_from_similarities(paper_similarity):
    number_of_papers = len(paper_similarity)
    min_distance = 50 # pixels
    max_distance = number_of_papers * 50 # pixels
    movement_decrease_ratio = 0.9
    movement_ratio = 1 # at first. will decrease later.
    min_movement = 10 # pixels

    # initialization
    paper_position = {}
    expected_distance = {}
    for paper in paper_similarity:
        paper_position[paper] = np.array([
            random.random() - 0.5, # x
            random.random() - 0.5  #y
        ])
        expected_distance[paper] = {}
        for paper2 in paper_similarity:
            if paper != paper2:
                similarity = paper_similarity[paper][paper2] 
                expected_distance[paper][paper2] =\
                    max_distance - (max_distance - min_distance) * similarity

    turn = 0
    # update
    moveFlag = True
    while moveFlag:
        print(turn)
        turn += 1
        moveFlag = False
        for paper1 in paper_similarity:
            for paper2 in paper_similarity:
                if paper1 != paper2:
                    similarity = paper_similarity[paper1][paper2]
                    
                    pos1 = paper_position[paper1]
                    pos2 = paper_position[paper2]
                    difference = pos2 - pos1
                    distance = np.linalg.norm(difference)

                    exp_dist = expected_distance[paper1][paper2]
                    expected_location = pos1 +\
                        difference * (exp_dist / distance)

                    movement = (expected_location - pos2) * movement_ratio
                    if np.linalg.norm(movement) > min_movement:
                        moveFlag = True
                        paper_position[paper2] = pos2 + movement
        movement_ratio *= movement_decrease_ratio
    
    # get things to the middle
    center_of_gravity = np.array([0.0, 0.0])
    for paper in paper_position:
        center_of_gravity += paper_position[paper]
    center_of_gravity /= number_of_papers
    for paper in paper_position:
        paper_position[paper] -= center_of_gravity

    return paper_position