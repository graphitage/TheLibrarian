import random
import numpy as np


def get_positions_from_similarities(paper_similarity):
    number_of_papers = len(paper_similarity)

    node_size = 200 # pixels
    min_movement = node_size / 20 # pixels
    movement_decrease_ratio = 0.9
    movement_ratio = 1 # at first. will decrease later.

    # distance is a cubic equation:
    # a * x^3 + b * x^2 + c * x + d (in pixels)
    # where x is the similarity score
    distance_function_at = {
        0: number_of_papers / 2 * (node_size / 5), # max distance
        1: node_size                     # min distance
    }
    distance_function_derivative_at = {
        0: - (25 / 9) * (distance_function_at[0] - distance_function_at[1]),
        1: 0
    }

    d = distance_function_at[0]
    c = distance_function_derivative_at[0]
    a = distance_function_derivative_at[1] - 2*distance_function_at[1] + c + 2*d
    b = distance_function_at[1] - a - c - d

    print(a,b,c,d)

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
                    a * similarity**3 + b * similarity**2 + c * similarity + d

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

                    if exp_dist < distance:
                        movement *= similarity
                    else:
                        movement *= (1 - similarity)
                    
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


def update_positions_with_paper(paper_similarity, positions):
    pass